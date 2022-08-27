import React from 'react'

const Alert = ({ color, children }) => {
  return (
    <div
      className={`${color} text-white px-6 py-4 border-0 rounded relative my-4`}
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">{children}</span>
    </div>
  )
}

export default Alert
