"use client";

import React, { useState, useEffect } from 'react';
import playButton from "../../../../public/play.png";
import Image from 'next/image';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  audioUrl?: string;
}

const jobs = [
  { title: "Frontend Developer", location: "Remote", status: "Open", applicants: 23 },
  { title: "Backend Developer", location: "Bangalore", status: "Closed", applicants: 45 },
  { title: "Product Manager", location: "Delhi", status: "Open", applicants: 12 },
];

const candidates = [
  { Name: 'Amisha', Role: 'Frontend Developer', Current_stage: 'Applied', Education: 'B.Tech in Computer Science, IIT Kharagpur', Experience: '2 years at Google' },
  { Name: 'Ayush', Role: 'Product Manager', Current_stage: 'Interview', Education: 'MBA from IIM Bangalore', Experience: '3 years at Flipkart' },
  { Name: 'Aritra', Role: 'Backend Developer', Current_stage: 'Offer', Education: 'M.Tech in Computer Science, IIIT Hyderabad', Experience: '4 years at Microsoft' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState<'initial' | 'awaiting_candidate' | 'awaiting_job'>('initial');

  useEffect(() => {
    // Initial greeting message
    const initialMessage: Message = {
      sender: 'bot',
      text: 'Hi, do you want to talk about jobs or candidates?',
    };
    setMessages([initialMessage]);
  }, []);

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
        const audioUrl = data.audio_url || 'invalid-url'; // Default invalid URL
        console.log(data);
        setMessages((prev) => {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], audioUrl };
          return updated;
        });
      })
      .catch((err) => {
        console.error(err);
        setMessages((prev) => {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], audioUrl: 'invalid-url' }; // Fallback
          return updated;
        });
      });
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    let botResponse: string;

    // Bot response after user message
    setTimeout(() => {
      let newContext = context;

      if (context === 'initial') {
        if (/candidate/i.test(userInput)) {
          botResponse = 'Please provide the candidate name.';
          newContext = 'awaiting_candidate';
        } else if (/job/i.test(userInput)) {
          botResponse = 'Please provide the job title.';
          newContext = 'awaiting_job';
        } else {
          botResponse = 'Sorry, I didn’t get that. Do you want to talk about jobs or candidates?';
        }
      } else if (context === 'awaiting_candidate') {
        const candidate = candidates.find((c) => c.Name.toLowerCase() === userInput.toLowerCase());
        if (candidate) {
          botResponse = `Here is the information about ${candidate.Name}:\nRole: ${candidate.Role}\nStage: ${candidate.Current_stage}\nEducation: ${candidate.Education}\nExperience: ${candidate.Experience}.`;
        } else {
          botResponse = "Candidate not found. Please try another name.";
        }
        newContext = 'initial';
      } else if (context === 'awaiting_job') {
        const job = jobs.find((j) => j.title.toLowerCase() === userInput.toLowerCase());
        if (job) {
          botResponse = `Here is the information about the ${job.title} role: \nLocation: ${job.location}, \nStatus: ${job.status}, \nApplicants: ${job.applicants}.`;
        } else {
          botResponse = "Job not found. Please try another title.";
        }
        newContext = 'initial';
      }

      const botMessage: Message = { sender: 'bot', text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
      setContext(newContext);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 mt-0">
     <div className="flex-1 p-4 pb-24 space-y-2 flex flex-col ">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-${msg.sender === 'user' ? 'end' : 'start'} space-y-1 max-w-[90%]`}
          >
            <div
              className={`flex items-center ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl break-words w-fit max-w-[80%] 
                ${msg.sender === 'user' ? 'bg-green-200 text-right' : 'bg-gray-300 text-left'}`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
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

            {msg.audioUrl && (
              <div
                className={`text-sm text-blue-700 break-words max-w-[80%] ${
                  msg.sender === 'user' ? 'text-right self-end' : 'text-left self-start'
                }`}
              >
                {msg.audioUrl === 'invalid-url' ? (
                  <span className="underline text-red-500">🔊 Audio unavailable</span>
                ) : (
                  <a href={msg.audioUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    🔊 Play Audio
                  </a>
                )}
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
