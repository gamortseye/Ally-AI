import React from 'react';


export default function MessageBubble({ message }) {
const isUser = message.role === 'user';
const wrapperClass = `mb-3 flex ${isUser ? 'justify-end' : 'justify-start'}`;
const bubbleClass = `${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} px-4 py-2 rounded-xl max-w-[80%]`;


return (
<div className={wrapperClass}>
<div className={bubbleClass}>
<div className="text-sm whitespace-pre-wrap">{message.text}</div>
</div>
</div>
);
}