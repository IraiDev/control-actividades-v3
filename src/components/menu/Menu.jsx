import React from 'react'
import { useToggle } from '../../hooks/useToggle'

const Menu = ({ menuButton, children }) => {
  const [showMenu, toggleMenu] = useToggle(null)
  return (
    <div>
      <button
        className='h-7 w-7 rounded-lg hover:bg-gray-500 hover:bg-opacity-10 transition duration-500'
        onClick={toggleMenu}
      >
        {menuButton}
      </button>
      <section
        className={`
          fixed animate__animated animate__faster
          ${showMenu === null && 'hidden'}
          ${showMenu ? 'animate__fadeIn' : 'animate__fadeOut'}
          `}
      >
        {children}
      </section>
    </div>
  )
}

export default Menu
