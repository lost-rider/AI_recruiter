'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import RightArrow from '../../assets/a1.png';
import DownArrow from '../../assets/a2.png';

const candidates = [
  {
    Name: 'Amisha',
    Role: 'Frontend Developer',
    Current_stage: 'Applied',
    Education: 'B.Tech in Computer Science, IIT Kharagpur',
    Experience: '2 years at Google',
  },
  {
    Name: 'Ayush',
    Role: 'Product Manager',
    Current_stage: 'Interview',
    Education: 'MBA from IIM Bangalore',
    Experience: '3 years at Flipkart',
  },
  {
    Name: 'Aritra',
    Role: 'Backend Developer',
    Current_stage: 'Offer',
    Education: 'M.Tech in Computer Science, IIIT Hyderabad',
    Experience: '4 years at Microsoft',
  },
];

export default function CandidatesPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Candidate Details</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left"></th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Job Role</th>
            <th className="px-4 py-2 text-left">Current Stage</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <React.Fragment key={index}>
              <tr className="border-t">
                <td className="px-4 py-2">
                  <button onClick={() => toggleRow(index)}>
                    {expandedRow === index ? (
                       <Image
                      src={DownArrow}
                      alt="Profile"
                      width={16}
                      height={16}
                      className="rounded-full cursor-pointer"
                      />
                    ) : (
                        <Image
                        src={RightArrow}
                        alt="Profile"
                        width={16}
                        height={16}
                        className="rounded-full cursor-pointer"
                        />
                    )}
                  </button>
                </td>
                <td className="px-4 py-2">{candidate.Name}</td>
                <td className="px-4 py-2">{candidate.Role}</td>
                <td
                  className={`px-4 py-2 ${
                    candidate.Current_stage === 'Offer'
                      ? 'text-green-600'
                      : candidate.Current_stage === 'Interview'
                      ? 'text-blue-600'
                      : 'text-red-500'
                  }`}
                >
                  {candidate.Current_stage}
                </td>
              </tr>
              {expandedRow === index && (
                <tr className="bg-gray-50 border-t">
                  <td colSpan={4} className="px-6 py-3">
                    <p><strong>Education Qualification:</strong> {candidate.Education}</p>
                    <p><strong>Years of Experience:</strong> {candidate.Experience}</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
