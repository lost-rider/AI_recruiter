// app/insights/page.tsx
'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const applicantsData = [
  { month: 'Jan', applicants: 120 },
  { month: 'Feb', applicants: 200 },
  { month: 'Mar', applicants: 150 },
  { month: 'Apr', applicants: 170 },
];

const conversionData = [
  { stage: 'Applied', percent: 100 },
  { stage: 'Screened', percent: 65 },
  { stage: 'Interviewed', percent: 35 },
  { stage: 'Hired', percent: 10 },
];

const roleData = [
  { name: 'Frontend Developer', value: 400 },
  { name: 'Product Manager', value: 300 },
  { name: 'Data Scientist', value: 300 },
  { name: 'Backend DEveloper', value: 200 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function InsightsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Insights Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Applicants Over Time */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Applicants Over Time</h2>
          <LineChart width={400} height={250} data={applicantsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applicants" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Conversion Rates */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Conversion Rates</h2>
          <BarChart width={400} height={250} data={conversionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percent" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Popular Roles */}
        <div className="bg-white rounded-xl shadow p-6 col-span-1 md:col-span-2">
  <h2 className="text-xl font-semibold mb-4">Popular Roles</h2>

  <PieChart width={400} height={250}>
    <Pie
      data={roleData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#8884d8"
      label
    >
      {roleData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>

  {/* Legend */}
  <div className="mt-4 flex flex-wrap gap-4">
    {roleData.map((entry, index) => (
      <div key={index} className="flex items-center space-x-2">
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></div>
        <span className="text-sm">{entry.name}</span>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}
