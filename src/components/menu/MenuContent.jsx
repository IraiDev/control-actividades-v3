import React from 'react'

const MenuContent = ({ children, styles }) => {
  return (
    <div className={`relative -top-2 right-32 rounded-md shadow-2xl min-w-menu border z-30 ${styles}`}>
      {children}
    </div>
  )
}

export default MenuContent
