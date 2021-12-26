import { useContext } from 'react'
import moment from 'moment'
import LiNote from '../ui/LiNote'
import { ActivityContext } from '../../context/ActivityContext'

const today = moment(new Date()).format('YYYY/MM/DD')

const ActivityCard = (props) => {

  const date = moment(props.fecha_tx)
  let userStyles = {
    priority: 'S/P',
    styles: 'border hover:border-gray-400'
  }
  const { user } = useContext(ActivityContext)

  switch (props.prioridad_etiqueta) {
    case 600:
      userStyles = {
        priority: 'Baja',
        styles: `border-white text-white ${user.color_prioridad_baja}`
      }
      break
    case 400:
      userStyles = {
        priority: 'Media',
        styles: `border-white text-white ${user.color_prioridad_media}`
      }
      break
    case 100:
      userStyles = {
        priority: 'Alta',
        styles: `border-white text-white ${user.color_prioridad_alta}`
      }
      break

    default:
      break
  }

  return (
    <div className={`
      p-4 rounded-lg shadow-md grid transition duration-200
      hover:shadow-xl hover:scale-95 transform text-sm
      ${userStyles.styles}
      `}>
      <div>
        <header className='flex items-start justify-between gap-3 capitalize font-semibold'>
          <h1 className='text-base'>
            {props.actividad || 'Sin Titulo'}
          </h1>
          <span className='bg-indigo-300 rounded-md py-0.5 px-2.5 text-indigo-600 mb-2'>
            {props.numberCard}
          </span>
        </header>
        <section className='grid grid-cols-2 gap-2'>
          <aside className='capitalize'>
            <p>
              <span className='font-semibold capitalize mr-1'>
                encargado:
              </span>
              {props.encargado_actividad}
            </p>
            <p>
              <span className='font-semibold capitalize mr-1'>
                proyecto:
              </span>
              {props.proyecto_tarea.abrev}
            </p>
            <p>
              <span className='font-semibold capitalize mr-1'>
                sub proyecto:
              </span>
              {props.subproyectos_tareas ? props.subproyectos_tareas.nombre_sub_proy : 'S/SP'}
            </p>
            <p>
              <span className='font-semibold capitalize mr-1'>
                solicitante:
              </span>
              {props.user_solicita}
            </p>
            <p>
              <span className='font-semibold capitalize'>
                estado:
              </span>
              {
                props.estado === 1 ? ' pendiente' : ' en trabajo'
              }
            </p>
          </aside>
          <aside className='capitalize'>
            <p>
              <span className='font-semibold mr-1'>
                ID:
              </span>
              {props.id_det}
            </p>
            <p>
              <span className='font-semibold mr-1'>
                ticket:
              </span>
              {props.num_ticket_edit}
            </p>
            <p>
              <span className='font-semibold mr-1'>
                fecha:
              </span>
              {date.format('DD/MM/YYYY')}
            </p>
            <p>
              <span className='font-semibold mr-1'>
                transcurridos:
              </span>
              {
                date.diff(today, 'days') - date.diff(today, 'days') * 2
              }
            </p>
            <p>
              <span className='font-semibold mr-1'>
                prioridad:
              </span>
              {userStyles.priority} ({props.num_prioridad})
            </p>
          </aside>
        </section>
        <section className={`
        ${userStyles.priority === 'S/P' ? 'bg-opacity-5' : 'bg-opacity-10'} 
          mt-2 bg-black bg-opacity-5 rounded-md p-1.5
        `}>
          <h5 className='font-semibold capitalize'>descripcion</h5>
          <p className='max-h-36 overflow-custom whitespace-pre-wrap mix-blend-luminosity'>
            {props.func_objeto}
          </p>
        </section>
        <section className='mt-2 p-1.5'>
          <h5 className='font-semibold capitalize'>notas (informes)</h5>
          <ul className='max-h-36 overflow-custom whitespace-pre-wrap mix-blend-luminosity'>
            {
              props.notas.length > 0 ?
                props.notas.map(note => (
                  <LiNote key={note.id_nota} {...note} />
                ))
                :
                <li className={`
                  ${userStyles.priority === 'S/P' ? 'text-gray-400' : 'text-gray-100'} 
                  text-opacity-80`}>
                  No hay notas...
                </li>
            }
          </ul>
        </section>
      </div>
      <footer className='place-self-end border-t w-full mt-2'>

      </footer>
    </div>
  )
}

export default ActivityCard
