import React from 'react'

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between">
    <div className={`p-3 rounded-full ${color} w-fit mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
    <h2 className="text-3xl font-bold text-gray-900 mt-1">{value}</h2>
  </div>
  )
}

export default StatCard