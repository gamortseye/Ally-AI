import React, { useState, useEffect } from "react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/ally logo.svg";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'like' or 'dislike'
  const [displayedText, setDisplayedText] = useState(""); // for animation

  const wrapperClass = `mb-4 flex ${isUser ? "justify-end" : "justify-start"}`;
  const bubbleClass = `${
    isUser ? "bg-[#F1F1F1] text-black" : "bg-white text-gray-800"
  } px-4 py-3 rounded-2xl max-w-[80%] relative`;

  // ⏳ Typing animation only for assistant messages
  useEffect(() => {
    if (!isUser) {
      let index = 0;
      const speed = 20; // typing speed (ms per char)
      const text = message.text;

      const typingInterval = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        if (index >= text.length) clearInterval(typingInterval);
      }, speed);

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText(message.text);
    }
  }, [message.text, isUser]);

  // Copy handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const toggleFeedback = (type) => {
    setFeedback((prev) => (prev === type ? null : type));
  };

  return (
    <div className={wrapperClass}>
      <div className={bubbleClass}>
        {/* Assistant Logo (appears immediately) */}
        {!isUser && (
          <div className="mb-2 flex justify-start items-center">
            <img src={logo} alt="Logo" className="w-6 h-6 opacity-80" />
          </div>
        )}

        {/* Message Text with typing effect */}
        <div className="text-sm whitespace-pre-wrap">
          {!isUser ? (
            <span className="typing-text">{displayedText}</span>
          ) : (
            message.text
          )}
        </div>

        {/* Icons row */}
        <div
          className={`flex items-center gap-4 mt-3 text-gray-400 text-sm ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          {/* Like/Dislike (Assistant only) */}
          {!isUser && (
            <>
              <button
                type="button"
                onClick={() => toggleFeedback("like")}
                className={`flex items-center transition ${
                  feedback === "like"
                    ? "text-blue-600"
                    : "hover:text-gray-600 text-gray-400"
                }`}
                title="Like"
              >
                <HandThumbUpIcon
                  className={`w-4 h-4 transition-transform ${
                    feedback === "like" ? "scale-110" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => toggleFeedback("dislike")}
                className={`flex items-center transition ${
                  feedback === "dislike"
                    ? "text-red-500"
                    : "hover:text-gray-600 text-gray-400"
                }`}
                title="Dislike"
              >
                <HandThumbDownIcon
                  className={`w-4 h-4 transition-transform ${
                    feedback === "dislike" ? "scale-110" : ""
                  }`}
                />
              </button>
            </>
          )}

          {/* Copy button (for both User and Assistant) */}
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center hover:text-gray-600 transition"
            title="Copy message"
          >
            <ClipboardDocumentIcon className="w-4 h-4" />
            <span
              className={`ml-1 text-xs transition-opacity duration-300 ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              Copied!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
