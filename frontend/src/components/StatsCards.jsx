import React from 'react';

export default function StatsCards({ stats }) {
  const cards = [
    { label: 'Total Feedback', value: stats?.totalFeedback || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Open Tickets', value: stats?.openTickets || 0, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'In Progress', value: stats?.inProgressTickets || 0, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Resolved', value: stats?.resolvedTickets || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{card.value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${card.bg} ${card.color} font-bold text-lg`}>
            #
          </div>
        </div>
      ))}
    </div>
  );
}