import { useRef, useState, useEffect } from 'react';


// onStop is a callback: async function onStop(audioBlob, language)
export function useAudioRecorder({ onStop } = {}) {
const mediaRecorderRef = useRef(null);
const [isRecording, setIsRecording] = useState(false);
const [audioChunks, setAudioChunks] = useState([]);
const [recordStatus, setRecordStatus] = useState('');
const audioContextRef = useRef(null);
const sourceRef = useRef(null);
const analyserRef = useRef(null);
const animationRef = useRef(null);
const canvasRef = useRef(null);
const selectedLangRef = useRef('');


const startRecording = async (lang = 'english') => {
try {
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const recorder = new MediaRecorder(stream);
mediaRecorderRef.current = recorder;
setAudioChunks([]);
selectedLangRef.current = lang;
setIsRecording(true);
setRecordStatus(` ${lang.toUpperCase()} `);


audioContextRef.current = new AudioContext();
sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
analyserRef.current = audioContextRef.current.createAnalyser();
sourceRef.current.connect(analyserRef.current);
analyserRef.current.fftSize = 64;


recorder.ondataavailable = (event) => {
setAudioChunks((prev) => [...prev, event.data]);
};


recorder.onstop = async () => {
const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
if (onStop) await onStop(audioBlob, selectedLangRef.current);
};


recorder.start();
} catch (err) {
console.error('Microphone error:', err);
setRecordStatus(' Microphone permission failed.');
}
};
const stopRecording = async () => {
if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
mediaRecorderRef.current.stop();
}
setIsRecording(false);
setRecordStatus('Processing audio...');
if (animationRef.current) cancelAnimationFrame(animationRef.current);
if (audioContextRef.current) await audioContextRef.current.close();
};


// waveform drawing
useEffect(() => {
if (!isRecording) return;
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext('2d');
const bufferLength = analyserRef.current.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);


const draw = () => {
animationRef.current = requestAnimationFrame(draw);
analyserRef.current.getByteTimeDomainData(dataArray);
ctx.clearRect(0, 0, canvas.width, canvas.height);


const barCount = 10;
const sliceWidth = canvas.width / barCount;
const halfHeight = canvas.height / 2;
for (let i = 0; i < barCount; i++) {
const index = Math.floor(i * (bufferLength / barCount));
const v = dataArray[index] / 255;
const barHeight = v * canvas.height;


const x = i * sliceWidth + sliceWidth * 0.1;
const y = halfHeight - barHeight / 2;
const width = sliceWidth * 0.8;
const height = barHeight;
const radius = width / 2;


ctx.fillStyle = '#3b82f6';
ctx.beginPath();
ctx.moveTo(x + radius, y);
ctx.lineTo(x + width - radius, y);
ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
ctx.lineTo(x + width, y + height - radius);
ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
ctx.lineTo(x + radius, y + height);
ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
ctx.lineTo(x, y + radius);
ctx.quadraticCurveTo(x, y, x + radius, y);
ctx.closePath();
ctx.fill();
}
};
draw();
return () => cancelAnimationFrame(animationRef.current);
}, [isRecording]);


return {
startRecording,
stopRecording,
canvasRef,
isRecording,
recordStatus,
setRecordStatus
};
}