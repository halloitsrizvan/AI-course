import React from 'react'

function NavItem({ icon: Icon, title, isActive, onClick }) {
  return (
    <button
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors w-full text-left
      ${isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
      }
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{title}</span>
  </button>
  )
}

export default NavItem