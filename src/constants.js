export const RAW_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const BASE = RAW_BASE.replace(/\/+$/, '');
export const API_ROOT = BASE.replace(/\/api\/generate\/?$/, '');
export const languageOptions = ['akan', 'arabic', 'french', 'swahili', 'portuguese','english'];
export const SPACE_URL = 'https://gamortsey-allyai-help-finder.hf.space';
