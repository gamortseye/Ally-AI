import { useState, useRef, useEffect } from 'react';
import {
  PhoneIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  StopIcon
} from '@heroicons/react/24/outline';

const RAW_BASE = process.env.VITE_API_URL || ''; // e.g. "https://<ngrok-free>.app"
const BASE = RAW_BASE.replace(/\/+$/, '');
const API_ROOT = BASE.replace(/\/api\/generate\/?$/, '');
const languageOptions = ['akan', 'arabic', 'french', 'swahili', 'portuguese','english'];

const buildUrl = (endpoint) => {
  const ep = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (BASE.match(/\/api\/generate$/)) return BASE + ep;
  return API_ROOT + ep;
};

export default function MainContent() {
  const SPACE_URL = 'https://gamortsey-allyai-help-finder.hf.space';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // chat messages { role: 'user'|'assistant', text }
  const [activeButton, setActiveButton] = useState(null); // 'help' | 'advice' | null
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [recordStatus, setRecordStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // indicates request in-flight
  const [isTyping, setIsTyping] = useState(false);

  // embed state
  const [showSpace, setShowSpace] = useState(false);
  const [spaceLoading, setSpaceLoading] = useState(false);

  // refs
  const textareaRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const messagesEndRef = useRef(null);

  // whether any assistant response exists
  const hasAssistant = messages.some(m => m.role === 'assistant');

  // show chat area when request in-flight or assistant has replied or space is shown
  const showChatArea = isLoading || hasAssistant || showSpace;

  // resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  // autoscroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, showSpace, spaceLoading]);

  // Recording / waveform
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
      setRecordStatus(' Microphone permission failed.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) mediaRecorder.stop();
    setIsRecording(false);
    setRecordStatus('Processing audio...');
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  useEffect(() => {
    if (!isRecording) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
  }, [isRecording]);

  // send audio to backend
  const sendAudioToBackend = async (audioBlob, language) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("language", language);

    try {
      const url = buildUrl('/process_audio');
      console.log('POST audio ->', url);
      const res = await fetch(url, { method: "POST", body: formData });
      const data = await res.json();
      setMessage(data.english_translation || '');
      setIsTyping(true);
      setRecordStatus('');
    } catch (err) {
      console.error("Upload failed:", err);
      setRecordStatus(' Failed to send audio.');
    }
  };

  // POST helper
  const postJSON = async (endpoint, payload) => {
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

  // add message helper
  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  // send advice: DO NOT show messages area until request starts.
  const sendAdvice = async (textToSend) => {
    if (!textToSend?.trim()) return;
    if (isLoading) return;

    // mark request in-flight (this will make chat area appear)
    setIsLoading(true);
    setIsTyping(true);

    try {
      const data = await postJSON('/get_advice_only', { user_input: textToSend });
      console.log("Advice response:", data);
      const respText = data.response || data.answer || JSON.stringify(data);

      // now append both user and assistant so conversation appears together
      addMessage('user', textToSend);
      addMessage('assistant', respText);

      // DO NOT open the HF Space here — showing Space only controlled by Help button
    } catch (err) {
      console.error("Advice request failed:", err);
      addMessage('user', textToSend);
      addMessage('assistant', `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setMessage('');
      setActiveButton(null);
    }
  };

  // send help - same pattern but DOES NOT toggle the HF Space (handled by Help button)
  const sendHelp = async (textToSend) => {
    // textToSend may be empty if we only opened the Space — in that case we skip backend call
    if (textToSend != null && !textToSend?.trim()) {
      // allow empty when called from Help toggle only (we will not call backend in that case)
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setIsTyping(true);

    try {
      const data = await postJSON('/find_professionals', { text: textToSend });
      console.log("Help response:", data);
      const respText = data.response || data.results || JSON.stringify(data);

      addMessage('user', textToSend);
      addMessage('assistant', respText);

      // DO NOT open the HF Space here — showing Space only controlled by Help button
    } catch (err) {
      console.error("Help request failed:", err);
      addMessage('user', textToSend);
      addMessage('assistant', `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setMessage('');
      setActiveButton(null);
    }
  };

  // submit handler
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!message.trim()) return;
    if (isLoading) return;
    if (activeButton === 'help') {
      // if Help is active and user submits text, call backend but do NOT control showSpace here
      await sendHelp(message);
    } else {
      await sendAdvice(message);
    }
  };

  // toggles
  const handleAdviceToggle = async () => {
    const newState = activeButton === 'advice' ? null : 'advice';
    setActiveButton(newState);

    // selecting Advice hides HF Space
    if (newState === 'advice') {
      setShowSpace(false);
    }

    if (newState === 'advice' && message.trim() && !isLoading) {
      await sendAdvice(message);
    }
  };

  const handleHelpToggle = async () => {
    const newState = activeButton === 'help' ? null : 'help';
    setActiveButton(newState);

    if (newState === 'help') {
      // open HF Space immediately when Help button is toggled on
      setShowSpace(true);
      setSpaceLoading(true);

      // if there is text, still call backend as before
      if (message.trim() && !isLoading) {
        await sendHelp(message);
      }
    } else {
      // toggle off hides the HF Space but preserves messages
      setShowSpace(false);
    }
  };

  // conditional classes: expanded flex layout when chat area visible so it reaches composer
  const chatWrapperClass = showChatArea
    ? "w-full max-w-3xl bg-white mb-4 overflow-hidden flex flex-col flex-1"
    : "w-full max-w-3xl bg-white rounded-lg border border-gray-200 mb-4 shadow-sm overflow-hidden";

  // when chat area is shown make it flex-1 so it grows to touch the composer
  const chatBoxInnerClass = showChatArea
    ? "px-4 py-3 overflow-y-auto flex-1"
    : "px-4 py-3 h-64 overflow-y-auto";

  const composerClass = showChatArea
    ? "relative w-full max-w-3xl bg-white p-3"
    : "relative w-full max-w-3xl bg-gray-50 rounded-2xl border border-gray-200 shadow-md overflow-hidden";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 font-sans min-h-screen bg-white">
      {/* header/title - show only before assistant replies and when HF space not shown */}
      {!hasAssistant && !showSpace && (
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold mb-1 text-gray-800">
            Hey, I am your <span className="text-blue-600">Ally</span>
          </h1>
          <p className="text-gray-600 text-sm">Tell me your story. I am ready to help.</p>
        </div>
      )}

      {/* Chat area: show only when a request is in-flight or assistant replied or space is shown */}
      {showChatArea && (
        <div className={chatWrapperClass}>
          <div className={chatBoxInnerClass} aria-live="polite">
            {/* if space should be shown, render iframe filling the chat box */}
            {showSpace ? (
              <div className="w-full h-full flex flex-col">
                {spaceLoading && (
                  <div className="text-sm text-gray-500 py-2">Loading embedded app…</div>
                )}
                <iframe
                  src={`${SPACE_URL}?__theme=light`}
                  title="Embedded HF Space - Ally Help Finder"
                  className="w-full flex-1 border-0"
                  style={{ minHeight: 380 }}
                  onLoad={() => setSpaceLoading(false)}
                  sandbox="allow-scripts allow-forms allow-popups"
                  loading="lazy"
                />
              </div>
            ) : (
              <>
                {messages.length === 0 && isLoading && (
                  <div className="w-full text-sm text-gray-500 py-4">Ally is typing…</div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} px-4 py-2 rounded-xl max-w-[80%]`}>
                      <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>
      )}

      {/* Composer - anchored visually lower when chat area visible */}
      <form onSubmit={handleSubmit} className={`w-full flex items-center justify-center ${showChatArea ? 'mt-auto' : ''}`}>
        <div className={composerClass}>
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
              className="w-full py-2 px-3 bg-white rounded-lg focus:outline-none resize-none overflow-hidden transition-all duration-200 text-gray-700 border border-transparent"
              style={{ minHeight: '40px' }}
            />
          </div>

          <div className="flex justify-between items-center p-1 bg-white relative">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleHelpToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeButton === 'help' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <PhoneIcon className="h-5 w-5" />
                <span>Help</span>
              </button>

              <button
                type="button"
                onClick={handleAdviceToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeButton === 'advice' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
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
                  if (isRecording) stopRecording();
                  else setShowLanguagePopup(!showLanguagePopup);
                }}
                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md"
              >
                {isRecording ? <StopIcon className="h-6 w-6" /> : <MicrophoneIcon className="h-6 w-6" />}
              </button>

              <button
                type="submit"
                disabled={isLoading}
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
        </div>
      </form>
    </div>
  );
}
