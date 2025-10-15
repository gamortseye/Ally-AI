import { openDB } from 'idb';
import CryptoJS from 'crypto-js';

const DB_NAME = 'ally_app_db';
const DB_VERSION = 1;
const STORE_NAME = 'user_preferences';
const ENCRYPTION_KEY = 'ally_secure_key_2025'; // In a real app, this should be more secure

// Initialize the IndexedDB database
export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return db;
};

// Encrypt data before storing
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

// Decrypt data after retrieval
const decryptData = (encryptedData) => {
  if (!encryptedData) return null;
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Set cookie consent
export const setCookieConsent = async (consent) => {
  const db = await initDB();
  const timestamp = new Date().toISOString();
  const encryptedConsent = encryptData({ consent, timestamp });
  
  await db.put(STORE_NAME, {
    id: 'cookieConsent',
    value: encryptedConsent
  });
  
  return true;
};

// Get cookie consent
export const getCookieConsent = async () => {
  try {
    const db = await initDB();
    const result = await db.get(STORE_NAME, 'cookieConsent');
    
    if (!result) return null;
    
    const decryptedData = decryptData(result.value);
    return decryptedData?.consent || null;
  } catch (error) {
    console.error('Error retrieving cookie consent:', error);
    return null;
  }
};

// Store user data securely
export const storeUserData = async (data) => {
  const db = await initDB();
  const encryptedData = encryptData(data);
  
  await db.put(STORE_NAME, {
    id: 'userData',
    value: encryptedData
  });
  
  return true;
};

// Retrieve user data
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

// Store chat history securely
export const storeChatMessage = async (message) => {
  const db = await initDB();
  
  // First, get existing messages
  const existingData = await db.get(STORE_NAME, 'chatHistory');
  let messages = [];
  
  if (existingData) {
    messages = decryptData(existingData.value) || [];
  }
  
  // Add new message with timestamp
  messages.push({
    ...message,
    timestamp: new Date().toISOString()
  });
  
  // Encrypt and store updated messages
  const encryptedMessages = encryptData(messages);
  await db.put(STORE_NAME, {
    id: 'chatHistory',
    value: encryptedMessages
  });
  
  return true;
};

// Get chat history
export const getChatHistory = async () => {
  try {
    const db = await initDB();
    const result = await db.get(STORE_NAME, 'chatHistory');
    
    if (!result) return [];
    
    return decryptData(result.value) || [];
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    return [];
  }
};

// Clear all stored data (for logout or user request)
export const clearAllData = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
  return true;
};