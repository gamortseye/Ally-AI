import React from 'react';
import { Link } from 'react-router-dom';


export default function AllyCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <div 
        className="relative bg-blue-500 text-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-xl"
        style={{ 
          transform: "perspective(1000px) rotate3d(1, 1, 0, 10deg)",
          background: "#417CDB"
        }}
      >
        <div className="px-10 py-14">
          {/* ALLY Title */}
          <h1 className="text-4xl font-bold mb-12">ALLY</h1>
          
          {/* Description Text - Center aligned */}
          <div className="text-center mx-auto mb-16">
            <p className="text-lg leading-relaxed">
              Our AI-powered platform empowers survivors of gender-based 
              violence (GBV) by offering 24/7 access to confidential support,
              legal aid, and shelters through multilingual, voice-first interfaces.
              Designed with inclusivity and trauma-informed care, we aim to
              dismantle stigma, raise awareness, and drive societal change.
              Together, we're building a safer, more equitable future where no
              one suffers in silence.
            </p>
          </div>
          
          {/* Proceed Button with correct icon */}
          <div className="flex justify-center">
            <Link to="/login">
              <button className="border-2 border-white bg-transparent text-white font-medium rounded-full px-8 py-3 flex items-center">
                <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                   <path d="M7.5 12H16.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                   <path d="M13.5 9L16.5 12L13.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                  Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}