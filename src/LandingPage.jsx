import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllyCard() {
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setSpin(true);
    setTimeout(() => navigate('/login'), 700); // Match animation duration
  };

  return (
    <>
      {/* Inline styles for animation */}
      <style>{`
        @keyframes spinYOnce {
          from {
            transform: perspective(1000px) rotate3d(1, 1, 0, 5deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotate3d(1, 1, 0, 5deg) rotateY(360deg);
          }
        }
        .spin-once {
          animation: spinYOnce 0.7s ease-in-out forwards;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-8">
        <div
          className={`relative text-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-xl
                      ${spin ? 'spin-once' : ''}`}
          style={{
            transform: 'perspective(1000px) rotate3d(1, 1, 0, 5deg)',
            background: '#417CDB',
          }}
        >
          <div className="px-6 sm:px-10 py-10 sm:py-14">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-10 sm:mb-12">ALLY</h1>

            {/* Description */}
            <div className="text-center mx-auto mb-12 sm:mb-16">
              <p className="text-base sm:text-lg leading-relaxed">
                Our AI-powered platform empowers survivors of gender-based
                violence (GBV) by offering 24/7 access to confidential support,
                legal aid, and shelters through multilingual, voice-first
                interfaces. Designed with inclusivity and trauma-informed care,
                we aim to dismantle stigma, raise awareness, and drive societal
                change. Together, we're building a safer, more equitable future
                where no one suffers in silence.
              </p>
            </div>

            {/* Proceed Button */}
            <div className="flex justify-center">
              <button
                onClick={handleProceed}
                className="w-full sm:w-auto border-2 border-white bg-transparent text-white
                           font-medium rounded-full px-6 sm:px-8 py-3 flex items-center
                           justify-center transition-all duration-200 ease-out
                           hover:bg-white hover:text-blue-600 active:scale-95"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M7.5 12H16.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 9L16.5 12L13.5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
