import React, { useEffect, useState } from 'react'
import { getFetch } from '../../helpers/fetchingGraph'
import PlannerCard from '../card/PlannerCard'

const Planner = () => {
   const [penddig, setPenddig] = useState(true)
   const [atWork, setAtwork] = useState(false)
   const [complete, setComplete] = useState(false)
   const [tasks, setTasks] = useState([])

   useEffect(() => {
      const getPlannerTask = async () => {
         await getFetch('/me/planner/tasks', '', 'details')
            .then(resp => {
               setTasks(resp.value)
            })
      }
      getPlannerTask()
   }, [])

   return (
      <>
         <header className='flex items-center justify-around bg-white p-4 m-5 rounded-lg border shadow-lg'>
            <label
               className={`flex items-center gap-3 capitalize cursor-pointer ${penddig && 'text-blue-400'}`}
               htmlFor="penddig">
               <input
                  id='penddig'
                  className='cursor-pointer'
                  type="checkbox"
                  checked={penddig}
                  onChange={() => setPenddig(!penddig)} />
               Pendientes
            </label>
            <label
               className={`flex items-center gap-3 capitalize cursor-pointer ${atWork && 'text-blue-400'}`}
               htmlFor="atWork">
               <input
                  id='atWork'
                  className='cursor-pointer'
                  type="checkbox"
                  checked={atWork}
                  onChange={() => setAtwork(!atWork)} />
               en trabajo
            </label>
            <label
               className={`flex items-center gap-3 capitalize cursor-pointer ${complete && 'text-blue-400'}`}
               htmlFor="complete">
               <input
                  id='complete'
                  className='cursor-pointer'
                  type="checkbox"
                  checked={complete}
                  onChange={() => setComplete(!complete)} />
               completadas
            </label>
         </header>
         <section className='grid gap-4 px-10 pb-5 max-h-res overflow-custom grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
               tasks.map(task => (
                  <PlannerCard
                     key={task.id}
                     etag={task}
                     references={task.details.references}
                     description={task.details.description}
                     checklist={task.details.checklist}
                     {...task} />
               ))
            }
         </section>
      </>
   )
}

export default Planner
