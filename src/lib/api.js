import { BASE, API_ROOT } from '../constants';


export const buildUrl = (endpoint) => {
const ep = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
if (BASE.match(/\/api\/generate$/)) return BASE + ep;
const url = API_ROOT + ep;
console.log('Built URL:', url, 'from BASE:', BASE, 'API_ROOT:', API_ROOT);
return url;
};


export const postJSON = async (endpoint, payload) => {
const url = buildUrl(endpoint);
console.log('POST ->', url, payload);
const res = await fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});
if (!res.ok) {
const text = await res.text();
throw new Error(`Request failed: ${res.status} ${text}`);
}
return res.json();
};


export const sendAudioToBackend = async (audioBlob, language) => {
const formData = new FormData();
formData.append('audio', audioBlob, 'recording.webm');
formData.append('language', language);


const url = buildUrl('/transcribe');
console.log('POST audio ->', url);


const res = await fetch(url, { method: 'POST', body: formData });
if (!res.ok) {
const txt = await res.text();
throw new Error(txt || `Upload failed: ${res.status}`);
}


const contentType = (res.headers.get('content-type') || '').toLowerCase();
if (contentType.includes('application/json')) {
const data = await res.json();
return data.english_translation || data.translation || data.text || JSON.stringify(data);
}
return res.text();
};