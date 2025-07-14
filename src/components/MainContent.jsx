import { useState, useRef, useEffect } from 'react';
import {
  PhoneIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  StopIcon
} from '@heroicons/react/24/outline';

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL_SAFE = BASE_URL.replace(/\/+$/, '');  
const languageOptions = ['akan', 'arabic', 'french', 'swahili', 'portuguese','english'];

function MainContent() {
  const [message, setMessage] = useState('');
  /*const [] = useState('');*/

  const [activeButton, setActiveButton] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [recordStatus, setRecordStatus] = useState('');

  const textareaRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
      

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const startRecording = async (lang) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      setSelectedLanguage(lang);
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

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        sendAudioToBackend(audioBlob, lang);
      };

      recorder.start();
    } catch (err) {
      console.error("Microphone error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) mediaRecorder.stop();
    setIsRecording(false);
    setRecordStatus('Processing audio...');

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  /*const drawWaveform = () => {*/
    useEffect(() => {
    if (!isRecording) return;                    

  
    const canvas = canvasRef.current;
    
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bufferLength = dataArray.length;
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

        ctx.fillStyle = "#3b82f6"; 
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
    },[isRecording])
  /*};*/

  const sendAudioToBackend = async (audioBlob, language) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("language", language);

    try {
      const res = await fetch(`${BASE_URL_SAFE}/process_audio`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setMessage(data.english_translation || '');
      setIsTyping(true);
      setRecordStatus('');
    } catch (err) {
      console.error("Upload failed:", err);
      setRecordStatus(' Failed to send audio.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    let endpoint = '/analyze_text';
    if (activeButton === 'help') endpoint = '/find_professionals';
    if (activeButton === 'advice') endpoint = '/get_advice_only';

    try {
      const res = await fetch(`${BASE_URL_SAFE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });

      const data = await res.json();
      console.log("Response from", endpoint, data);
    } catch (err) {
      console.error("Request failed:", err);
    }

    setMessage('');
    setIsTyping(false);
    setActiveButton(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-white items-center justify-center p-6 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-800">
          Hey, I am your <span className="text-blue-600">Ally</span>
        </h1>
        <p className="text-gray-600 text-lg font-medium">Tell me your story. I am ready to help.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-3xl bg-gray-50 rounded-2xl border border-gray-200 shadow-md overflow-hidden"
      >
        <div className="p-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            placeholder="Speak, I’m listening..."
            rows="3"
            className="w-full py-2 px-3 bg-gray-50 rounded-lg focus:outline-none resize-none overflow-hidden transition-all duration-200 text-gray-700"
            style={{ minHeight: '40px' }}
          />
        </div>

        <div className="flex justify-between items-center p-1 bg-gray-50 relative">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setActiveButton(activeButton === 'help' ? null : 'help')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                activeButton === 'help'
                  ? 'bg-blue-100 text-blue-700 border-blue-300 shadow-inner'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <PhoneIcon className="h-5 w-5" />
              <span>Help</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveButton(activeButton === 'advice' ? null : 'advice')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                activeButton === 'advice'
                  ? 'bg-blue-100 text-blue-700 border-blue-300 shadow-inner'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <InformationCircleIcon className="h-5 w-5" />
              <span>Advice</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {isRecording && (
              <canvas
                ref={canvasRef}
                width={100}
                height={30}
                className="rounded-md bg-transparent"
              />
            )}

            {recordStatus && (
              <span className="text-sm text-blue-500 whitespace-nowrap">{recordStatus}</span>
            )}

            <button
              type="button"
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                } else {
                  setShowLanguagePopup(!showLanguagePopup);
                }
              }}
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md"
            >
              {isRecording ? <StopIcon className="h-6 w-6" /> : <MicrophoneIcon className="h-6 w-6" />}
            </button>

            <button
              type="submit"
              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </div>

          {showLanguagePopup && !isRecording && (
            <div className="absolute bottom-14 right-3 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 p-2 w-48 text-sm font-medium text-gray-800">
              <div className="text-center text-blue-600 font-semibold mb-2">Choose Language</div>
              <div className="max-h-[50px] overflow-y-auto flex flex-col gap-1 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {languageOptions.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setShowLanguagePopup(false);
                      startRecording(lang);
                    }}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default MainContent;
