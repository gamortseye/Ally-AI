import React, { useState } from 'react';
import { PhoneIcon, InformationCircleIcon, PaperAirplaneIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';
import { languageOptions } from '../constants';

export default function Composer({
  message,
  setMessage,
  onSubmit,
  onHelpToggle,
  onAdviceToggle,
  activeButton,
  isLoading,
  isRecording,
  startRecording,
  stopRecording,
  canvasRef,
  recordStatus
}) {
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  return (
    <form onSubmit={onSubmit} className={`w-full flex items-center justify-center`}> 
      <div className={isLoading ? "relative w-full max-w-3xl bg-white p-3" : "relative w-full max-w-3xl bg-gray-50 rounded-2xl border border-gray-200 shadow-md overflow-hidden"}>
        <div className="p-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
              onClick={onHelpToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeButton === 'help' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <PhoneIcon className="h-5 w-5" />
              <span>Help</span>
            </button>

            <button
              type="button"
              onClick={onAdviceToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeButton === 'advice' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <InformationCircleIcon className="h-5 w-5" />
              <span>Advice</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {isRecording && (
              <canvas ref={canvasRef} width={100} height={30} className="rounded-md bg-transparent" />
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
  );
}