import React, { useEffect, useRef, useState } from 'react';
import {
  PhoneIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  StopIcon
} from '@heroicons/react/24/outline';
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
  const textareaRef = useRef(null);

  const isTyping = Boolean(message && message.trim().length > 0);

  // autosize textarea: set height to scrollHeight
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.max(18, ta.scrollHeight)}px`;
  }, [message]);

  return (
    <>
      <style>{`
        .composer-outer {
          border: 0.5px solid rgba(0,0,0,0.10);
          border-radius: 30px;
          background: #FFFFFF;
          box-shadow: 0 6px 30px rgba(0,0,0,0.08);
        }
        .composer-inner { padding: 10px; }
        .composer-textarea {
          padding: 0;
          margin: 0;
          resize: none;
          overflow: hidden;
          outline: none;
          border: none;
          background: transparent;
          width: 100%;
          color: #000000;
          font-size: 16px;
          line-height: 1.35;
        }
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 0.5px solid rgba(0,0,0,0.10);
          border-radius: 8px;
          padding: 4px;
          min-width: 32px;
          min-height: 32px;
        }
        .pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0.5px solid rgba(0,0,0,0.10);
          background: transparent;
          color: #000000;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 13px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          text-shadow: 0 1px 2px rgba(0,0,0,0.10);
        }
        .pill-btn.active { background: rgba(65,124,219,0.12); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <form onSubmit={onSubmit} className="w-full flex items-center justify-center">
        <div className="composer-outer w-full max-w-3xl composer-inner">
          {/* Textarea on top */}
          <div className="w-full">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="speak am listening..."
              rows={1}
              className="composer-textarea no-scrollbar"
              aria-label="Message composer"
            />
          </div>

          {/* Controls row */}
          <div className="w-full mt-3 flex items-center justify-between">
            {/* Left: Help / Advice */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onHelpToggle}
                aria-pressed={activeButton === 'help'}
                className={`pill-btn ${activeButton === 'help' ? 'active' : ''}`}
                style={{ color: '#000000' }}
              >
                <PhoneIcon className="w-4 h-4" style={{ color: '#417CDB' }} />
                <span style={{ color: '#000000', textShadow: '0 1px 2px rgba(0,0,0,0.12)' }}>Help</span>
              </button>

              <button
                type="button"
                onClick={onAdviceToggle}
                aria-pressed={activeButton === 'advice'}
                className={`pill-btn ${activeButton === 'advice' ? 'active' : ''}`}
                style={{ color: '#000000' }}
              >
                <InformationCircleIcon className="w-4 h-4" style={{ color: '#417CDB' }} />
                <span style={{ color: '#000000', textShadow: '0 1px 2px rgba(0,0,0,0.12)' }}>Advice</span>
              </button>
            </div>

            {/* Right: status / canvas / mic/send/stop (single stop when recording) */}
            <div className="flex items-center gap-2">
              {isRecording && (
                <canvas ref={canvasRef} width={100} height={32} className="rounded-md bg-transparent" />
              )}

              {recordStatus && (
                <span style={{ color: '#417CDB', fontSize: 13, minWidth: 80 }}>{recordStatus}</span>
              )}

              {/* Show language/mic toggle only when NOT recording and NOT typing */}
              {!isRecording && !isTyping && (
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setShowLanguagePopup(prev => !prev)}
                    className="icon-btn"
                    aria-label="Choose language / start recording"
                    style={{ borderRadius: 20 }}
                  >
                    <MicrophoneIcon className="w-5 h-5" style={{ color: '#417CDB' }} />
                  </button>

                  {showLanguagePopup && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 'calc(100% + 8px)',
                      background: '#fff',
                      borderRadius: 12,
                      border: '0.5px solid rgba(0,0,0,0.12)',
                      padding: 8,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      zIndex: 60,
                      width: 160
                    }}>
                      <div style={{ textAlign: 'center', color: '#417CDB', fontWeight: 600, marginBottom: 6 }}>Choose Language</div>
                      <div style={{ maxHeight: 140, overflowY: 'auto' }}>
                        {languageOptions.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setShowLanguagePopup(false);
                              startRecording(lang);
                            }}
                            style={{
                              display: 'block',
                              width: '100%',
                              padding: '8px 10px',
                              textAlign: 'left',
                              borderRadius: 8,
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Single Stop button when recording */}
              {isRecording ? (
                <button
                  type="button"
                  onClick={stopRecording}
                  aria-label="Stop recording"
                  title="Stop"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#417CDB',           // filled box color
                    border: '0.5px solid rgba(0,0,0,0.25)',
                    borderRadius: 20,
                    padding: 6,
                    minWidth: 36,
                    minHeight: 36
                  }}
                >
                  <StopIcon className="w-5 h-5" style={{ color: '#ffffff' }} />
                </button>
              ) : isTyping ? (
                // Send button when typing (icon-only, transparent bg)
                <button
                  type="submit"
                  disabled={isLoading}
                  aria-label="Send message"
                  className="icon-btn"
                  style={{ borderRadius: 20, padding: 6 }}
                >
                  <PaperAirplaneIcon className="w-5 h-5" style={{ color: '#417CDB', transform: 'rotate(0deg)' }} />
                </button>
              ) : (
                // When not typing and not recording, no stop/send in action area (mic is above)
                null
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
