import { useEffect, useState } from 'react'
import { Login } from '@microsoft/mgt-react'
import Button from './Button'
import LiNav from './LiNav'
import { deleteFetch, getFetch, updateFetch, postFetch } from '../../helpers/fetchingGraph'
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

   const getTodoList = () => {
      getFetch('/me/todo/lists')
         .then(resp => setList(resp.value))
   }

   const handleDeleteList = ({ id, title }) => {
      const action = async () => {
         const resp = await deleteFetch(`todo/lists/${id}`)
         if (resp) setList(list.filter(item => item.id !== id))
         else {
            Alert({
               icon: 'error',
               title: 'Error',
               content: 'No se pudo eliminar la lista, recargue la pagina e intente nuevamente',
               showCancelButton: false,
               timer: 5000
            })
         }
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

   const handleUpdateList = async () => {
      const resp = await updateFetch(`todo/lists/${id}`, { displayName: title })
      if (resp) {
         setList(list.map(item => {
            if (item.id === id) {
               item.displayName = title
            }
            return item
         }))
      }
      else {
         Alert({
            icon: 'error',
            title: 'Error',
            content: 'No se pudo actualizar la lista, recargue la pagina e intente nuevamente',
            showCancelButton: false,
            timer: 5000
         })
      }
      toggleModalUpdate()
   }

   const handleCreateList = async () => {
      const resp = await postFetch('todo/lists', { displayName: title })
      if (resp) getTodoList()
      else {
         Alert({
            icon: 'error',
            title: 'Error',
            content: 'No se pudo crear la lista, recargue la pagina e intente nuevamente',
            showCancelButton: false,
            timer: 5000
         })
      }
      toggleModalUpdate()
   }

   const handleOpenModalUpdate = ({ id, title, isUpdate }) => {
      if (isUpdate) {
         setlistData({ id, title })
         toggleModalUpdate()
      }
      else {
         setlistData({ id: null, title: '' })
         toggleModalUpdate()
      }
   }

   useEffect(() => {
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
                  onClick={() => handleOpenModalUpdate({ isUpdate: false })} />
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
                              onUpdate={() => handleOpenModalUpdate({ id: obj.id, title: obj.displayName, isUpdate: true })}
                              onDelete={() => handleDeleteList({ id: obj.id })}
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

         {/* modal update/create list */}
         <Modal showModal={showModalUpdate} onClose={toggleModalUpdate}
            className='max-w-md'
            padding='p-6'
         >
            <div className='grid gap-4'>
               <h1 className='font-semibold text-lg'>
                  {
                     listData.id === null ? 'Crear lista' : 'Actualizar lista'
                  }
               </h1>
               <Input
                  field='nombre lista'
                  name='title'
                  value={title}
                  onChange={e => setlistData({ ...listData, title: e.target.value })}
               />
               <footer className='grid place-self-end'>
                  <Button
                     className='border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full w-max'
                     name={listData.id === null ? 'Crear' : 'Actualizar'}
                     onClick={() => listData.id === null ? handleCreateList() : handleUpdateList()}
                  />
               </footer>
            </div>
         </Modal>
      </>
   )
}

export default NavMenu
