import React from 'react'
import Menu from '../menu/Menu'
import MenuContent from '../menu/MenuContent'
import Button from '../ui/Button';

const TodoCard = (props) => {

   const { id, title, body, importance } = props
   const styles = importance === 'high' ?
      'bg-gray-700 hover:bg-gray-800 text-white transition duration-300'
      : 'bg-white transition duration-300'

   return (
      <div
         className={`p-4 rounded-md border shadow-md hover:shadow-2xl hover:border-gray-600 ${styles}`}
      >
         <header className='flex items-center justify-between mb-2'>
            <h1 className='font-semibold capitalize flex items-center gap-3'>
               {importance === 'high' && <i className='fas fa-star text-yellow-500'></i>}
               {title}
            </h1>
            <Menu
               menuButton={<i className='fas fa-ellipsis-v fa-xs'></i>}
            >
               <MenuContent styles={styles}>
                  <Button
                     className='block w-full hover:bg-gray-500 hover:bg-opacity-10'
                     name='editar'
                  />
                  <Button
                     className='block w-full hover:bg-gray-500 hover:bg-opacity-10'
                     name='eliminar'
                  />
               </MenuContent>
            </Menu>
         </header>
         <section>
            <p className='whitespace-pre-wrap p-1 text-sm max-h-60 overflow-custom'>
               {body.content}
            </p>
         </section>
      </div>
   )
}

export default TodoCard
