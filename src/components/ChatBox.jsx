import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { SPACE_URL } from "../constants";

export default function ChatBox({ messages, showSpace, spaceLoading, messagesEndRef }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!showSpace) setIframeLoaded(false);
  }, [showSpace]);

  return (
    <div className="w-full h-full flex flex-col">
      {showSpace ? (
        <>
          {/* Smart animated loading message */}
          {!iframeLoaded && (
            <div className="flex items-center justify-center py-3">
              <div className="flex items-center space-x-2 animate-fade-in">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.30s]" />
                <span className="text-sm text-gray-200 font-medium ml-2">
                  Loading embedded app…
                </span>
              </div>
            </div>
          )}

          <iframe
            src={`${SPACE_URL}?__theme=light`}
            title="Embedded HF Space - Ally Help Finder"
            className="w-full flex-1 border-0 transition-all duration-500 ease-in-out"
            style={{
              minHeight: 380,
              opacity: iframeLoaded ? 1 : 0.5,
              transform: iframeLoaded ? "scale(1)" : "scale(0.98)",
            }}
            sandbox="allow-scripts allow-forms allow-popups"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
          />
        </>
      ) : (
        <>
          {/* Smart animated “Ally is typing…” */}
          {messages.length === 0 && (
            <div className="flex items-center justify-center w-full py-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="h-2 w-2 bg-gray-200 rounded-full animate-bounce" />
                <div className="h-2 w-2 bg-gray-200 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 bg-gray-200 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-sm font-medium ml-2">Analyzing…</span>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
