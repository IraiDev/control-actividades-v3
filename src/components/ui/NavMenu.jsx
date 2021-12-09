import { Login } from '@microsoft/mgt-react'
import Button from './Button'
import LiNav from './LiNav'

const NavMenu = ({ isOpen, toggleMenu }) => {

   return (
      <nav className={
         `h-screen w-72 fixed top-0 right-0 bg-white shadow-lg border
         animate__animated animate__faster z-30
         ${isOpen === null && 'hidden'}
         ${isOpen ? 'animate__slideInRight' : 'animate__slideOutRight'}
         `}>
         <header className='flex justify-between items-center p-5'>
            <h1 className='capitalize text-gray-500'>menu</h1>
            <Button
               className='rounded-lg hover:bg-gray-100'
               type='icon'
               icon='fas fa-times'
               onClick={toggleMenu} />
         </header>
         <ul className='mb-10'>
            <LiNav to='/informe-tiempos' name='informe de tiempos' />
            <LiNav to='/actividades' name='actividades' />
            <LiNav to='/planner' name='planner' />
         </ul>
         <div className='mx-5 border-t border-gray-300' />
         <section className='p-5 flex items-center justify-between'>
            <h1 className='capitalize text-gray-500'>To-dos</h1>
            <Button
               className='rounded-lg hover:bg-gray-100'
               type='icon'
               icon='fas fa-plus'
               onClick={toggleMenu} />
         </section>
         <ul>
            <LiNav to='/todo' name='Ignacio arriagda' />
            <LiNav to='/todo' name='Zionit' />
            <LiNav to='/todo' name='Lista 1' />
         </ul>
         <span className='absolute bottom-0 left-0 w-full h-14 transition duration-300 hover:bg-lg flex justify-center items-center'>
            <Login />
            <i className="fas fa-sign-out-alt"></i>
         </span>
      </nav >
   )
}

export default NavMenu
