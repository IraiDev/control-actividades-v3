import React, { useState } from 'react'
import TodoCard from '../card/TodoCard'

const Todo = () => {

   const [tasks, setTasks] = useState([])
   const [important, setImportant] = useState(false)

   return (
      <>
         <header className='flex items-center justify-around bg-white p-4 m-5 rounded-lg border shadow-lg'>

         </header>
         <section className='grid gap-4 px-10 pb-5 max-h-res overflow-custom grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
               tasks.map(task => {
                  if (important === task.percentComplete) {
                     return (
                        <TodoCard
                           // onAddTask={handleAddTask}
                           key={task.id}
                           etag={task}
                           references={task.details.references}
                           description={task.details.description}
                           checklist={task.details.checklist}
                           {...task} />
                     )
                  }
                  else {
                     return null
                  }
               })
            }
         </section>
      </>
   )
}

export default Todo
