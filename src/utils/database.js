// src/utils/database.js
import { openDB } from 'idb';
import CryptoJS from 'crypto-js';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

/* ---------- Config (use env in production) ---------- */
const DB_NAME = 'ally_app_db';
const DB_VERSION = 1;
const STORE_NAME = 'user_preferences';

const ENV_ENCRYPTION_KEY =
  (typeof process !== 'undefined' && (process.env.VITE_ENCRYPTION_KEY || process.env.REACT_APP_ENCRYPTION_KEY)) ||
  'ally_secure_key_2025';

const SUPABASE_URL =
  (typeof process !== 'undefined' && (process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL)) || '';
const SUPABASE_ANON_KEY =
  (typeof process !== 'undefined' && (process.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY)) || '';

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const ENCRYPTION_KEY = ENV_ENCRYPTION_KEY;

/* ---------- IndexedDB init ---------- */
export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains(STORE_NAME)) {
        upgradeDb.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return db;
};

/* ---------- Encryption helpers ---------- */
const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  } catch (err) {
    console.error('Encrypt error', err);
    return null;
  }
};

const decryptData = (encryptedData) => {
  try {
    if (!encryptedData) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (err) {
    console.error('Decrypt error', err);
    return null;
  }
};

/* ---------- Cookie consent helpers (persisted encrypted) ---------- */
export const setCookieConsent = async (consent) => {
  const db = await initDB();
  const timestamp = new Date().toISOString();
  const encryptedConsent = encryptData({ consent, timestamp });
  await db.put(STORE_NAME, {
    id: 'cookieConsent',
    value: encryptedConsent,
  });
  return true;
};

export const getCookieConsent = async () => {
  try {
    const db = await initDB();
    const result = await db.get(STORE_NAME, 'cookieConsent');
    if (!result) return null;
    const decryptedData = decryptData(result.value);
    return decryptedData?.consent ?? null;
  } catch (error) {
    console.error('Error retrieving cookie consent:', error);
    return null;
  }
};

/* ---------- User data helpers ---------- */
export const storeUserData = async (data) => {
  const db = await initDB();
  const encryptedData = encryptData(data);
  await db.put(STORE_NAME, {
    id: 'userData',
    value: encryptedData,
  });
  return true;
};

export const getUserData = async () => {
  try {
    const db = await initDB();
    const result = await db.get(STORE_NAME, 'userData');
    if (!result) return null;
    return decryptData(result.value);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/* ---------- Local storage helpers ---------- */
export const getLocalRecord = async (id) => {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
};

export const putLocalRecord = async (record) => {
  const db = await initDB();
  await db.put(STORE_NAME, record);
  return record;
};

export const deleteLocalRecord = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

/* ---------- Chat message storage + supabase sync ---------- */
export const storeChatMessageLocal = async (message) => {
  const db = await initDB();
  const existing = await db.get(STORE_NAME, 'chatHistory');
  let messages = [];

  if (existing) {
    messages = decryptData(existing.value) || [];
  }

  const clientId = message.client_message_id || uuidv4();
  const messageWithMeta = {
    client_message_id: clientId,
    role: message.role,
    text: message.text,
    meta: message.meta || null,
    timestamp: new Date().toISOString(),
  };

  messages.push(messageWithMeta);
  const encryptedMessages = encryptData(messages);

  await db.put(STORE_NAME, {
    id: 'chatHistory',
    value: encryptedMessages,
  });

  return messageWithMeta;
};

export const getChatHistory = async () => {
  try {
    const db = await initDB();
    const entry = await db.get(STORE_NAME, 'chatHistory');
    if (!entry) return [];
    return decryptData(entry.value) || [];
  } catch (err) {
    console.error('getChatHistory error', err);
    return [];
  }
};

export const sendMessageToSupabase = async ({ client_message_id, role, text, encrypted_text = null, is_encrypted = false, meta = null, client_device_id = null }) => {
  if (!supabase) {
    console.warn('Supabase not configured. Skipping remote message send.');
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const payload = {
      client_message_id,
      role,
      text: is_encrypted ? null : text,
      encrypted_text: is_encrypted ? encrypted_text : null,
      is_encrypted,
      meta,
      client_device_id,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('messages').insert([payload]).select();
    if (error) {
      console.error('Supabase message insert error', error);
      return { data: null, error };
    }

    return { data: data?.[0] ?? null, error: null };
  } catch (err) {
    console.error('sendMessageToSupabase error', err);
    return { data: null, error: err };
  }
};

export const storeAndSendMessage = async ({ role, text, meta = null, client_device_id = null, encryptForServer = false }) => {
  const clientMessage = {
    client_message_id: uuidv4(),
    role,
    text,
    meta,
    timestamp: new Date().toISOString(),
  };

  // store locally first
  const localSaved = await storeChatMessageLocal(clientMessage);

  // prepare server payload
  let serverPayload = {
    client_message_id: localSaved.client_message_id,
    role: localSaved.role,
    meta: localSaved.meta,
    client_device_id,
    is_encrypted: false,
    text: localSaved.text,
    encrypted_text: null,
  };

  if (encryptForServer) {
    serverPayload.encrypted_text = encryptData({ text: localSaved.text, meta: localSaved.meta });
    serverPayload.is_encrypted = true;
    serverPayload.text = null;
  }

  // fire and forget
  sendMessageToSupabase(serverPayload)
    .then((res) => {
      if (res.error) {
        console.warn('Failed to send message to Supabase (kept local):', res.error);
      } else {
        // optionally handle server mapping here
      }
    })
    .catch((err) => console.error('sendMessageToSupabase error', err));

  return localSaved;
};

/* ---------- Feedback (local + supabase) ---------- */
export const sendFeedbackToSupabase = async ({ client_message_id, role, feedback, text = null, client_device_id = null, extra = null }) => {
  if (!supabase) {
    console.warn('Supabase not configured. Skipping remote feedback send.');
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const payload = {
      client_message_id,
      role,
      feedback,
      text,
      client_device_id,
      extra: extra ? JSON.stringify(extra) : null,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('message_feedback').insert([payload]).select();
    if (error) {
      console.error('Supabase feedback insert error', error);
      return { data: null, error };
    }

    return { data: data?.[0] ?? null, error: null };
  } catch (err) {
    console.error('sendFeedbackToSupabase error', err);
    return { data: null, error: err };
  }
};

export const recordFeedback = async ({ client_message_id, role, feedback, text = null, client_device_id = null, extra = null }) => {
  const db = await initDB();
  const localKey = `feedback:${uuidv4()}`;
  const payload = {
    client_message_id,
    role,
    feedback,
    text,
    client_device_id,
    extra,
    timestamp: new Date().toISOString(),
  };

  await db.put(STORE_NAME, {
    id: localKey,
    value: encryptData(payload),
  });

  // attempt to send (non-blocking)
  sendFeedbackToSupabase({ client_message_id, role, feedback, text, client_device_id, extra })
    .then((res) => {
      if (res.error) {
        console.warn('Supabase feedback failed (keeping local copy)', res.error);
      } else {
        // delete local copy on success
        // delete is async; don't block
        initDB().then((dbInst) => dbInst.delete(STORE_NAME, localKey)).catch((err) => console.warn('Failed to delete local feedback after sync', err));
      }
    })
    .catch((err) => console.error('sendFeedbackToSupabase error', err));

  return payload;
};

/* ---------- Sync helpers ---------- */
export const syncPendingFeedbackToSupabase = async () => {
  if (!supabase) return { synced: 0, error: 'Supabase not configured' };
  const db = await initDB();
  const keys = await db.getAllKeys(STORE_NAME);
  let synced = 0;

  for (const key of keys) {
    if (typeof key === 'string' && key.startsWith('feedback:')) {
      const entry = await db.get(STORE_NAME, key);
      const payload = decryptData(entry.value);
      if (!payload) continue;

      const { error } = await sendFeedbackToSupabase({
        client_message_id: payload.client_message_id,
        role: payload.role,
        feedback: payload.feedback,
        text: payload.text,
        client_device_id: payload.client_device_id,
        extra: payload.extra,
      });

      if (!error) {
        await db.delete(STORE_NAME, key);
        synced++;
      }
    }
  }

  return { synced, error: null };
};

export const syncPendingMessagesToSupabase = async (opts = { encryptForServer: false }) => {
  if (!supabase) return { synced: 0, error: 'Supabase not configured' };
  const db = await initDB();
  const entry = await db.get(STORE_NAME, 'chatHistory');
  if (!entry) return { synced: 0, error: null };

  const messages = decryptData(entry.value) || [];
  let synced = 0;
  for (const msg of messages) {
    try {
      const payload = {
        client_message_id: msg.client_message_id,
        role: msg.role,
        meta: msg.meta,
        client_device_id: null,
        is_encrypted: false,
        text: msg.text,
        encrypted_text: null,
      };

      if (opts.encryptForServer) {
        payload.encrypted_text = encryptData({ text: msg.text, meta: msg.meta });
        payload.is_encrypted = true;
        payload.text = null;
      }

      const res = await sendMessageToSupabase(payload);
      if (!res.error) {
        synced++;
      } else {
        console.warn('Failed to send message during sync', res.error);
      }
    } catch (err) {
      console.error('sync send error', err);
    }
  }

  // If everything synced, we may clear local history. Here we only clear if at least 1 message synced.
  if (synced > 0) {
    try {
      await db.delete(STORE_NAME, 'chatHistory');
    } catch (err) {
      console.warn('Failed to delete chatHistory after sync', err);
    }
  }

  return { synced, error: null };
};
