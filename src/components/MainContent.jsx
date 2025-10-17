import React, { useState, useRef } from 'react';
import Header from './header';
import ChatBox from './ChatBox';
import Composer from './Composer';
import { postJSON, sendAudioToBackend } from '../lib/api';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

export default function MainContent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSpace, setShowSpace] = useState(false);
  const [spaceLoading, setSpaceLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const addMessage = (role, text) => setMessages(prev => [...prev, { role, text }]);

  const onStopAudio = async (audioBlob, language) => {
    try {
      setIsLoading(true);
      const translatedText = await sendAudioToBackend(audioBlob, language);
      setMessage(translatedText || '');
      setIsTyping(Boolean(translatedText));
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const { startRecording, stopRecording, canvasRef, isRecording, recordStatus } = useAudioRecorder({ onStop: onStopAudio });

  const sendAdvice = async (textToSend) => {
    if (!textToSend?.trim()) return;
    if (isLoading) return;
    setIsLoading(true);
    setIsTyping(true);
    try {
      const data = await postJSON('/get_advice_only', { user_input: textToSend });
      const respText = data.response || data.answer || JSON.stringify(data);
      addMessage('user', textToSend);
      addMessage('assistant', respText);
    } catch (err) {
      console.error('Advice request failed:', err);
      addMessage('user', textToSend);
      addMessage('assistant', `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setMessage('');
      setActiveButton(null);
    }
  };

  const sendHelp = async (textToSend) => {
    if (textToSend != null && !textToSend?.trim()) return;
    if (isLoading) return;
    setIsLoading(true);
    setIsTyping(true);
    try {
      const data = await postJSON('/find_professionals', { text: textToSend });
      const respText = data.response || data.results || JSON.stringify(data);
      addMessage('user', textToSend);
      addMessage('assistant', respText);
    } catch (err) {
      console.error('Help request failed:', err);
      addMessage('user', textToSend);
      addMessage('assistant', `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setMessage('');
      setActiveButton(null);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!message.trim()) return;
    if (isLoading) return;
    if (activeButton === 'help') await sendHelp(message);
    else await sendAdvice(message);
  };

  const handleAdviceToggle = async () => {
    const newState = activeButton === 'advice' ? null : 'advice';
    setActiveButton(newState);
    if (newState === 'advice') setShowSpace(false);
    if (newState === 'advice' && message.trim() && !isLoading) await sendAdvice(message);
  };

  const handleHelpToggle = async () => {
    const newState = activeButton === 'help' ? null : 'help';
    setActiveButton(newState);
    if (newState === 'help') {
      setShowSpace(true);
      setSpaceLoading(true);
      if (message.trim() && !isLoading) await sendHelp(message);
    } else {
      setShowSpace(false);
    }
  };

  const hasAssistant = messages.some(m => m.role === 'assistant');
  const showChatArea = isLoading || hasAssistant || showSpace;

  const chatWrapperClass = showChatArea
    ? 'w-full max-w-3xl bg-white-70 mb-4 overflow-hidden flex flex-col flex-1'
    : 'w-full max-w-3xl bg-white-70 rounded-lg border border-gray-200 mb-4 shadow-sm overflow-hidden';

  const chatBoxInnerClass = showChatArea
    ? 'px-4 py-3 overflow-y-auto flex-1'
    : 'px-4 py-3 h-64 overflow-y-auto';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 font-sans min-h-screen bg-white">
      {!hasAssistant && !showSpace && <Header />}

      {showChatArea && (
        <div className={chatWrapperClass}>
          <div className={chatBoxInnerClass} aria-live="polite">
            <ChatBox messages={messages} showSpace={showSpace} spaceLoading={spaceLoading} messagesEndRef={messagesEndRef} />
          </div>
        </div>
      )}

      <Composer
        message={message}
        setMessage={setMessage}
        onSubmit={handleSubmit}
        onHelpToggle={handleHelpToggle}
        onAdviceToggle={handleAdviceToggle}
        activeButton={activeButton}
        isLoading={isLoading}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        canvasRef={canvasRef}
        recordStatus={recordStatus}
      />
    </div>
  );
}