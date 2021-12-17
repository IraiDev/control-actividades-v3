import { useEffect, useState } from 'react'
import { Person } from '@microsoft/mgt-react'
import moment from 'moment'
import { getFetch } from '../../helpers/fetchingGraph'
import TextContent from '../ui/TextContent'
import Button from '../ui/Button'

let state = ''

const PlannerCard = ({
  id,
  planId,
  title,
  description,
  assignments,
  createdBy,
  createdDateTime,
  references,
  percentComplete,
  etag,
  onAddTask
}) => {
  const [plan, setPlan] = useState('')

  switch (percentComplete) {
    case 0:
      state = 'Pendiente'
      break
    case 50:
      state = 'En trabajo'
      break
    case 100:
      state = 'Completada'
      break
    default:
      state = 'Desconocido'
      break;
  }

  useEffect(() => {
    getFetch(`/planner/plans/${planId}`, 'title')
      .then(resp => {
        setPlan(resp.title)
      })
  }, [planId])

  return (
    <div className='relative transition duration-500 w-full gap-2 p-4 bg-white border-2 rounded-md shadow-lg border-transparent hover:border-gray-600'>
      <header className='grid grid-cols-2'>
        <section>
          <h1 className='font-semibold capitalize mb-1'>{title}</h1>
          <TextContent className='text-xs' tag='plan' value={plan} />
          <TextContent
            className='text-xs'
            tag='Fecha'
            value={moment(createdDateTime).format('DD-MM-yyyy')}
          />
          <TextContent className='text-xs mb-2' tag='Estado' value={state} />
        </section>
        <section className='flex text-gray-500 text-center text-xs gap-4'>
          <div>
            <h5 className='mb-2'>{Object.keys(assignments).length > 1 ? 'encargados' : 'encargado'}</h5>
            {
              Object.keys(assignments).length > 0 &&
              Object.keys(assignments).map(obj => (
                <Person className='rounded-full p-0.5 shadow-md' key={obj} userId={obj} />
              ))
            }
          </div>
          <div>
            <h5 className='mb-2'>Solicita</h5>
            <Person className='rounded-full p-0.5 shadow-md' userId={createdBy.user.id} />
          </div>
        </section>
      </header>
      <section className='bg-black bg-opacity-5 p-2 my-2 rounded-md'>
        <h5 className='capitalize text-xs text-gray-600'>descripcion</h5>
        <p className={`text-xs px-2 mt-1 text-justify max-h-32 overflow-custom ${description === '' && 'text-gray-400'}`}>
          {description === '' ? 'No hay descripcion...' : description}
        </p>
      </section>
      <ul className='w-full'>
        <h5 className='text-xs capitalize text-gray-600 mb-1'>archivos</h5>
        {
          Object.entries(references).length > 0 ?
            Object.entries(references).map((r, i) => (
              <li className='text-xs text-gray-600 pl-2 hover:text-blue-500 w-max' key={i}>
                <a rel='noreferrer' target='_blank' href={decodeURIComponent(r[0])}>{decodeURIComponent(r[1].alias)}</a>
              </li>
            ))
            : <p className='text-xs text-gray-400 mb-1 pl-2'>No hay archivos...</p>
        }
      </ul>
      {
        percentComplete === 0 &&
        <Button
          className='h-8 w-8 hover:bg-gray-200 rounded-full absolute bottom-3 right-3'
          type='icon'
          icon='fas fa-reply'
          onClick={() => onAddTask({ title, description, idTask: id, plan, etag })} />
      }
    </div>
  )
}

export default PlannerCard
