import React from 'react';
import MessageBubble from './MessageBubble';
import { SPACE_URL } from '../constants';


export default function ChatBox({ messages, showSpace, spaceLoading, messagesEndRef }) {
return (
<div className="w-full h-full flex flex-col">
{showSpace ? (
<>
{spaceLoading && <div className="text-sm text-gray-500 py-2">Loading embedded app…</div>}
<iframe
src={`${SPACE_URL}?__theme=light`}
title="Embedded HF Space - Ally Help Finder"
className="w-full flex-1 border-0"
style={{ minHeight: 380 }}
sandbox="allow-scripts allow-forms allow-popups"
loading="lazy"
/>
</>
) : (
<>
{messages.length === 0 && <div className="w-full text-sm text-gray-500 py-4">Ally is typing…</div>}


{messages.map((m, i) => (
<MessageBubble key={i} message={m} />
))}
<div ref={messagesEndRef} />
</>
)}
</div>
);
}