// app/dashboard/page.tsx
'use client';
import Image from "next/image";
import d1 from "../../../public/d1.png";
import d2 from "../../../public/d2.png";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-16">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Welcome to the Dashboard!
      </h1>

      {/* First Row: Image Left, Text Right */}
      <div className="flex items-center justify-between gap-8">
        <Image
          src={d1}
          alt="Dashboard1"
          width={500}
          height={500}
          className="rounded-xl shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">What's new in your career journey?</h2>
          <p className="text-gray-700">
            Keep track of your applications, interview updates, and progress. This dashboard helps
            you stay organized and motivated in your job search.
          </p>
        </div>
      </div>

      {/* Second Row: Text Left, Image Right (bottom aligned) */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1 mb-16">
          <h2 className="text-xl font-semibold ">How’s the job market?</h2>
          <p className="text-gray-700">
            The tech industry is evolving rapidly. Everyone should stay energetic, upskill regularly,
            and be kind to each other — success follows!
          </p>
        </div>
        <Image
          src={d2}
          alt="Dashboard2"
          width={400}
          height={400}
          className="rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}
