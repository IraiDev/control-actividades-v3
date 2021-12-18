import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import TodoCard from '../card/TodoCard'
import { getFetch } from '../../helpers/fetchingGraph'
import queryString from 'query-string'

const Todo = () => {
   const { id } = useParams()
   const { search } = useLocation()
   const { title = '', icon = '' } = queryString.parse(search)
   const [tasks, setTasks] = useState([])
   const [important, setImportant] = useState({ select: false, value: '' })

   useEffect(() => {
      const endPoint = `/me/todo/lists/${id}/tasks`
      getFetch(endPoint)
         .then(resp => setTasks(resp.value))
   }, [id])

   return (
      <>
         <header
            className='flex items-center justify-around bg-white p-4 m-5 rounded-lg border shadow-lg'
         >
            <div className='flex items-center gap-2'>
               <i className={icon}></i>
               <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>
               <label htmlFor="importance">
                  <input
                     className="hidden"
                     type="checkbox"
                     id="importance"
                     checked={important.select}
                     onChange={e => {
                        e.target.checked ? setImportant({ select: e.target.checked, value: 'high' })
                           : setImportant({ select: e.target.checked, value: '' })
                     }} />
                  <i className={`
                     transition duration-500 cursor-pointer fa-lg hover:text-yellow-400
                      ${important.select ? 'fas fa-star text-yellow-500' : 'far fa-star'}`}
                  ></i>
               </label>
            </div>
         </header>
         <section
            className='grid gap-4 px-10 pb-5 max-h-res overflow-custom 
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
         >
            {
               tasks.length > 0 ?
                  tasks.map(task => {
                     let condition
                     if (important.select) condition = task.importance === important.value
                     else condition = true
                     if (condition) {
                        return (
                           <TodoCard
                              key={task.id}
                              {...task} />
                        )
                     }
                     else {
                        return null
                     }
                  }) : <p>No hay Tareas...</p>
            }
         </section>
      </>
   )
}

export default Todo
