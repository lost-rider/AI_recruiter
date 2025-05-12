// app/dashboard/settings/page.tsx
import React from 'react';

const jobs = [
    {
        title: "Frontend Developer",
        location: "Remote",
        status: "Open",
        applicants: 23,
    },
    {
        title: "Backend Developer",
        location: "Bangalore",
        status: "Closed",
        applicants: 45,
    },
    {
        title: "Product Manager",
        location: "Delhi",
        status: "Open",
        applicants: 12,
    },
];

export default function JobsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Current Job Openings</h1>
            <table className="w-full table-auto border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">Job Title</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Applicants</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2">{job.title}</td>
                            <td className="px-4 py-2">{job.location}</td>
                            <td className={`px-4 py-2 ${job.status === 'Open' ? 'text-green-600' : 'text-red-500'}`}>
                                {job.status}
                            </td>
                            <td className="px-4 py-2">{job.applicants}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
