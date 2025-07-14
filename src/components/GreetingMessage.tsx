const GreetingMessage = () => {
  return (
    <>
      {/* Inline animation styles */}
      <style>{`
        @keyframes blink {
          0%, 95%, 100% { transform: scaleY(1); }
          96%, 97%      { transform: scaleY(0.05); }
        }
      `}</style>

      <div className="inline-flex items-center border-3 border-[#417CDB] rounded-full px-8 py-4 text-[#3772dd] bg-white shadow-md">
        {/* Big Animated Face */}
        <svg
          className="mr-4"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#417CDB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Head */}
          <circle cx="12" cy="12" r="10" />

          {/* Eyes */}
          <circle className="eye" cx="8.5" cy="9" r="1.5" fill="#417CDB" style={{ animation: "blink 4s infinite", transformOrigin: "center" }} />
          <circle className="eye" cx="15.5" cy="9" r="1.5" fill="#417CDB" style={{ animation: "blink 4s infinite", transformOrigin: "center" }} />

          {/* Wild Smiling Mouth */}
          <path d="M6 15 C12 24 18 15 18 15">
            <animate
              attributeName="d"
              dur="1.3s"
              repeatCount="indefinite"
              values="
                M6 15 C12 24 18 15 18 15;
                M6 15 C12 20 18 15 18 15;
                M6 15 C12 24 18 15 18 15
              "
            />
          </path>
        </svg>

        {/* Text */}
        <span className="text-3xl font-bold">HELLO</span>
      </div>
    </>
  );
};

export default GreetingMessage;
