"use client";

import React, { useState } from 'react';
import playButton from "../../assets/play.png";
import Image from 'next/image';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  audioUrl?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  // Play TTS and update audioUrl for clicked message
  function tts(textinput: string, idx: number) {
    fetch('http://localhost:8000/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: textinput,
        voice: 'female',
        flag: true,
      }),
    })
      .then((res) => res.json())
      
      .then((data) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], audioUrl: data.audio_url };
          return updated;
        });
        console.log(data);
      })
      .catch((err) => console.error(err));
      
  }

  // Send user message and mock bot response
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        sender: 'bot',
        text: `You said: "${input}"`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 mt-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-${
              msg.sender === 'user' ? 'end' : 'start'
            } space-y-1 max-w-[90%]`}
          >
            <div
              className={`flex items-center ${
                msg.sender === 'user'
                  ? 'flex-row-reverse space-x-reverse space-x-2'
                  : 'space-x-2'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl break-words w-fit max-w-[80%] 
                ${
                  msg.sender === 'user'
                    ? 'bg-green-200 text-right'
                    : 'bg-gray-300 text-left'
                }`}
              >
                {msg.text}
              </div>

              <Image
                src={playButton}
                alt="Play"
                width={16}
                height={16}
                onClick={() => tts(msg.text, idx)}
                className="cursor-pointer"
              />
            </div>

            {/* 🎧 Conditionally render audio URL under only that message */}
            {msg.audioUrl && (
              <div
                className={`text-sm text-blue-700 break-words max-w-[80%] ${
                  msg.sender === 'user' ? 'text-right self-end' : 'text-left self-start'
                }`}
              >
                <a href={msg.audioUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  🔊 Play Audio
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex gap-2 bg-white sticky bottom-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
