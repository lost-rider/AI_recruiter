// app/dashboard/layout.tsx
"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function DashboardLayout(
    
    
    {
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [sidemodal, showsidemodal]=useState(false);
    function profileModal(){
       showsidemodal(prev=>!prev);
    }
    function logout(){
        redirect('/login');
    }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <div className="text-xl font-bold mb-6">MyApp</div>
        <nav className="space-y-2">
          <a href="/dashboard" className="block hover:text-gray-300">
            Dashboard
          </a>
          <a href="/dashboard/settings" className="block hover:text-gray-300">
            Jobs
          </a>
          <a href="/dashboard/profile" className="block hover:text-gray-300">
            Candidates
          </a>
          <a href="/dashboard/profile" className="block hover:text-gray-300">
            Insights
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white shadow flex items-center justify-end px-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Hello, User</span>
            <div className="w-8 h-8 rounded-full bg-gray-300"  onClick={profileModal}/>
          </div>
        </header>

        {sidemodal && (
        <div className="absolute right-0 mt-12 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>Logout</li>
            <li
              className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
              onClick={() => showsidemodal(false)}
            >
              Close
            </li>
          </ul>
        </div>
      )}
        {/* Page Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
