import React from 'react';

export default function FeedbackList({ feedbacks, onStatusChange }) {
  const getPriorityBadge = (p) => {
    switch (p) {
      case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryBadge = (c) => {
    switch (c) {
      case 'BUG': return 'bg-rose-50 text-rose-600';
      case 'FEATURE_REQUEST': return 'bg-purple-50 text-purple-600';
      default: return 'bg-teal-50 text-teal-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="font-bold text-slate-800 text-base">Feedback Tickets</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                  No feedback tickets found for this project.
                </td>
              </tr>
            ) : (
              feedbacks.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-800 max-w-xs truncate">
                    {item.message}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded border text-xs font-semibold ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {item.userEmail || 'Anonymous'}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                      className="bg-slate-100 text-xs font-semibold border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}