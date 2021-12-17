import { useEffect, useState } from 'react'
import { Login } from '@microsoft/mgt-react'
import Button from './Button'
import LiNav from './LiNav'
import { deleteFetch, getFetch, updateFetch } from '../../helpers/fetchingGraph'
import ButtonNav from './ButtonNav'
import { Alert } from '../../helpers/alerts'
import Modal from './Modal'
import { useToggle } from '../../hooks/useToggle'
import Input from './Input'

const NavMenu = ({ isOpen, toggleMenu }) => {

   const [list, setList] = useState([])
   const [listData, setlistData] = useState({ id: null, title: '' })
   const [showModalUpdate, toggleModalUpdate] = useToggle(false)

   const { id, title } = listData

   const handleDeleteList = ({ id, title }) => {

      const action = async () => {
         await deleteFetch(`todo/lists/${id}`)
         setList(list.filter(item => item.id !== id))
      }

      Alert({
         icon: 'warn',
         title: 'Atencion',
         content: `¿Esta seguro de eliminar la siguiente lista: <strong>${title}</strong>?`,
         confirmText: 'Si, eliminar',
         cancelText: 'No, cancelar',
         action
      })
   }

   // TODO: faltaria cerrar el modal y mostrar loading
   const handleUpdateList = async () => {
      await updateFetch(`todo/lists/${id}`, { displayName: title })
      setList(list.map(item => {
         if (item.id === id) {
            item.displayName = title
         }
         return item
      }))
   }

   const handleOpenModalUpdate = ({ id, title }) => {
      setlistData({ id, title })
      toggleModalUpdate()
   }

   useEffect(() => {
      const getTodoList = async () => {
         await getFetch('/me/todo/lists')
            .then(resp => {
               setList(resp.value)
               console.log(resp.value)
            })
      }
      getTodoList()
   }, [])

   return (
      <>
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
            <section>
               {
                  list.map(obj => {
                     if (!obj.isOwner || (obj.isOwner && obj.wellknownListName === "defaultList")) {
                        return (
                           <ButtonNav
                              key={obj.id}
                              id={obj.id}
                              title={obj.displayName}
                              icon={`fas ${!obj.isOwner ? 'fa-user-friends' : 'fa-home'}`}
                              isAction={false}
                           //   active={obj.id === idTodoList && 'bg-gray-800'}
                           />
                        )
                     } else {
                        return null
                     }
                  })
               }
               <hr className="my-3" />
               {
                  list.map(obj => {
                     if (obj.wellknownListName !== "defaultList" && obj.isOwner) {
                        return (
                           <ButtonNav
                              key={obj.id}
                              id={obj.id}
                              title={obj.displayName}
                              icon="fas fa-list-ul"
                              onUpdate={handleOpenModalUpdate}
                              onDelete={handleDeleteList}
                           //   active={obj.id === idTodoList && 'bg-gray-800'}
                           />
                        )
                     } else {
                        return null
                     }
                  })
               }
            </section>
            <span className='absolute bottom-0 left-0 w-full h-14 transition duration-300 hover:bg-lg flex justify-center items-center'>
               <Login />
               <i className="fas fa-sign-out-alt"></i>
            </span>
         </nav >

         {/* modal update list */}
         <Modal showModal={showModalUpdate} onClose={toggleModalUpdate}
            className='max-w-md'
            padding='p-6'
         >
            <div className='grid gap-4'>
               <h1 className='font-semibold text-lg'>Actualizar lista</h1>
               <Input
                  field='nombre lista'
                  name='title'
                  value={title}
                  onChange={e => setlistData({ ...listData, title: e.target.value })}
               />
               <footer className='grid place-self-end'>
                  <Button
                     className='border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full w-max'
                     name='actualizar'
                     onClick={handleUpdateList}
                  />
               </footer>
            </div>
         </Modal>
      </>
   )
}

export default NavMenu
