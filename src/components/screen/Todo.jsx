import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import TodoCard from '../card/TodoCard'
import { getFetch, postFetch } from '../../helpers/fetchingGraph'
import queryString from 'query-string'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import { useToggle } from '../../hooks/useToggle'
import { useForm } from '../../hooks/useForm'
import { Alert } from '../../helpers/alerts'

const Todo = () => {
   const { id } = useParams()
   const { search } = useLocation()
   const { title_list = '', icon_list = '' } = queryString.parse(search)
   const [tasks, setTasks] = useState([])
   const [important, setImportant] = useState({ select: false, value: '' })
   const [newImportant, setNewImportant] = useState({ select: false, value: 'normal' })
   const [showModalNewTodo, toggleModalNewTodo] = useToggle(false)
   const [{ title, desc }, onChangeValues, reset] = useForm({ title: '', desc: '' })

   const taskFetch = () => {
      getFetch(`/me/todo/lists/${id}/tasks`)
         .then(resp => setTasks(resp.value))
         .catch(console.log)
   }

   const onCreateTodo = async (e) => {
      e.preventDefault()
      const data = {
         title,
         importance: newImportant.value,
         body: { content: desc }
      }
      const ok = await postFetch(`todo/lists/${id}/tasks`, data)
      if (ok) { taskFetch() }
      else {
         Alert({
            title: 'Error',
            icon: 'error',
            content: 'error al crear la to-do',
            showCancelButton: false,
         })
      }
      closeModalNewTodo()
   }

   const closeModalNewTodo = () => {
      setNewImportant({ select: false, value: '' })
      toggleModalNewTodo()
      reset()
   }

   useEffect(() => {
      taskFetch()
      // eslint-disable-next-line
   }, [id])

   return (
      <>
         <header
            className='flex items-center justify-between bg-white p-4 m-5 rounded-lg border shadow-lg'
         >
            <div className='flex items-center gap-2'>
               <h1 className='text-lg font-semibold text-gray-800'>
                  <i className={icon_list}></i> {title_list}
               </h1>
               <label htmlFor='importance'>
                  <input
                     className='hidden'
                     type='checkbox'
                     id='importance'
                     checked={important.select}
                     onChange={e => {
                        e.target.checked ? setImportant({ select: e.target.checked, value: 'high' })
                           : setImportant({ select: e.target.checked, value: '' })
                     }} />
                  <i className={`
                     transition duration-500 cursor-pointer fa-lg hover:text-yellow-400
                      ${important.select ? 'fas fa-star text-yellow-500' : 'far fa-star'}
                  `}
                  ></i>
               </label>
            </div>
            <Button
               className='bg-blue-400 hover:bg-blue-500 text-white rounded-full'
               name='nuevo to-do'
               onClick={toggleModalNewTodo}
            />
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

         {/* modal new to-do */}
         <Modal showModal={showModalNewTodo} onClose={closeModalNewTodo} isBlur={false}
            className='max-w-2xl' padding='p-7'
         >
            <form onSubmit={onCreateTodo} className='grid gap-6'>
               <h1 className='text-lg font-semibold'>Crear to-do</h1>
               <section className='flex items-center justify-between gap-4'>
                  <Input
                     className='w-full'
                     field='titulo'
                     name='title'
                     value={title}
                     onChange={onChangeValues}
                  />
                  <label htmlFor='newImprotant' className='pt-6'>
                     <input
                        className='hidden'
                        type='checkbox'
                        id='newImprotant'
                        checked={newImportant.select}
                        onChange={e => {
                           e.target.checked ? setNewImportant({ select: e.target.checked, value: 'high' })
                              : setNewImportant({ select: e.target.checked, value: 'normal' })
                        }} />
                     <i className={`
                     transition duration-500 cursor-pointer fa-lg hover:text-yellow-400
                      ${newImportant.select ? 'fas fa-star text-yellow-500' : 'far fa-star'}
                  `}
                     ></i>
                  </label>
               </section>
               <TextArea
                  field='descripcion'
                  name='desc'
                  value={desc}
                  onChange={onChangeValues}
               />
               <footer className='grid place-self-end'>
                  <Button
                     className='border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white rounded-full w-max'
                     type='submit'
                     name='crear to-do'
                  />
               </footer>
            </form>
         </Modal>

      </>
   )
}

export default Todo
