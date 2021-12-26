import React from 'react'
import Menu from '../menu/Menu'
import MenuContent from '../menu/MenuContent'
import Button from '../ui/Button';

const TodoCard = (props) => {

   const { title, body, importance } = props
   const styles = importance === 'high' ?
      'bg-gray-700 text-white transition duration-200'
      : 'bg-white transition duration-200 border hover:border-gray-400'

   return (
      <div
         onDoubleClick={props.editTodo}
         className={`
            p-4 rounded-md shadow-md
            hover:shadow-xl hover:scale-95 transform
            ${styles}
         `}>
         <header className='flex items-center justify-between mb-2'>
            <h1 className='font-semibold capitalize flex items-center gap-3'>
               {importance === 'high' &&
                  <i className='fas fa-star text-yellow-500'></i>
               }
               {title}
            </h1>
            <Menu
               menuButton={<i className='fas fa-ellipsis-v fa-xs'></i>}
            >
               <MenuContent styles={styles}>
                  <Button
                     className='block w-full hover:bg-gray-500 hover:bg-opacity-10'
                     name='editar'
                     onClick={props.editTodo}
                  />
                  <Button
                     className='block w-full hover:bg-gray-500 hover:bg-opacity-10'
                     name='eliminar'
                     onClick={props.deleteTodo}
                  />
               </MenuContent>
            </Menu>
         </header>
         <section className='max-h-60 overflow-custom'>
            <p className={`
               whitespace-pre-wrap p-1.5 text-sm bg-black rounded-md
               ${importance === 'high' ? 'bg-opacity-10' : 'bg-opacity-5'}
            `}>
               {body.content}
            </p>
         </section>
      </div>
   )
}

export default TodoCard
