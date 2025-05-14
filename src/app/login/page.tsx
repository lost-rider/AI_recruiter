'use client';

import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    redirect('/dashboard');
  };

  return (
    <div className="flex h-screen">
      {/* Left half - Animated Image */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1629904888132-038af9df34ab?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Right half - Animated Form */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-1/2 flex flex-col items-center justify-center bg-gray-100"
      >
        <h1 className="text-4xl font-extrabold text-center text-oklch mb-16">
  Welcome to <span className="text-gray-900">AI Recruiter!</span>
</h1>
        <form
          onSubmit={handleLogin}
          className="bg-white p-12 rounded-2xl shadow-md w-full max-w-xl h-[500px]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
  type="submit"
  className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-4  text-oklch rounded-lg transition duration-300"
>
  Sign In
</button>

        </form>
      </motion.div>
    </div>
  );
}
