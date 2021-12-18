import React from 'react'

const TodoCard = (props) => {

   const { id, title, body, importance } = props

   return (
      <div
         className='p-4 rounded-lg bg-white shadow-md border hover:bg-gray-50 
         hover:border-gray-500 transition duration-300'
      >
         <header className='flex items-center justify-between'>
            <h1 className='font-semibold capitalize'>
               {importance === 'high' && <i className='fas fa-star text-yellow-500'></i>} {title}
            </h1>
            <span>ico</span>
         </header>
         <section>
            <p className='whitespace-pre-wrap text-gray-700 text-sm max-h-60 overflow-custom'>
               {body.content}
            </p>
         </section>
      </div>
   )
}

export default TodoCard
