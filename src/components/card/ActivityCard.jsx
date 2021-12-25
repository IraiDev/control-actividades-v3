import moment from 'moment'
import React from 'react'

const today = moment(new Date()).format('YYYY/MM/DD')

const ActivityCard = (props) => {

  const date = moment(props.fecha_tx)

  return (
    <div className='p-3 rounded-md shadow-md bg-white border grid gap-3'>
      <header className='flex items-center justify-between capitalize font-semibold'>
        <span className='bg-green-300 rounded-md py-1 px-2.5 text-green-600'>
          {props.numberCard}
        </span>
        <h1>{props.actividad}</h1>
      </header>
      <section className='grid grid-cols-2 gap-2 text-xs'>
        <aside className='capitalize'>
          <p>
            <span className='font-bold capitalize mr-1'>
              encargado:
            </span>
            {props.encargado_actividad}
          </p>
          <p>
            <span className='font-bold capitalize mr-1'>
              proyecto:
            </span>
            {props.proyecto_tarea.abrev}
          </p>
          <p>
            <span className='font-bold capitalize mr-1'>
              sub proyecto:
            </span>
            {props.subproyectos_tareas ? props.subproyectos_tareas.nombre_sub_proy : 'S/SP'}
          </p>
          <p>
            <span className='font-bold capitalize mr-1'>
              solicitante:
            </span>
            {props.user_solicita}
          </p>
          <p>
            <span className='font-bold capitalize'>
              estado:
            </span>
            {
              props.estado === 1 ? ' pendiente' : ' en trabajo'
            }
          </p>
        </aside>
        <aside className='capitalize'>
          <p>
            <span className='font-bold mr-1'>
              ID:
            </span>
            {props.id_det}
          </p>
          <p>
            <span className='font-bold mr-1'>
              ticket:
            </span>
            {props.num_ticket_edit}
          </p>
          <p>
            <span className='font-bold mr-1'>
              fecha:
            </span>
            {date.format('DD/MM/YYYY')}
          </p>
          <p>
            <span className='font-bold mr-1'>
              transcurridos:
            </span>
            {
              date.diff(today, 'days') - date.diff(today, 'days') * 2
            }
          </p>
          <p>
            <span className='font-bold mr-1'>
              prioridad:
            </span>
            {
              props.prioridad_etiqueta === 1000 ? 'S/P' :
                props.prioridad_etiqueta === 600 ? 'baja' :
                  props.prioridad_etiqueta === 400 ? 'media' :
                    props.prioridad_etiqueta === 200 && 'alta'

                      (props.num_prioridad)
            }
          </p>
        </aside>
      </section>
      <section className='text-xs grid gap-2 border-b pb-4'>
        <h5 className='font-bold capitalize'>descripcion</h5>
        <p className='max-h-44 overflow-custom bg-black bg-opacity-10 rounded-md p-1.5 whitespace-pre-wrap'>
          {props.func_objeto}
        </p>
        <h5 className='font-bold capitalize'>notas (informes)</h5>
        <ul className='max-h-44 overflow-custom whitespace-pre-wrap'>
          {
            props.notas.length > 0 ?
              props.notas.map((note, i) => (
                <li key={i}>
                  <span>
                    IA (22-01-2020):
                  </span>
                  asdasdasdasdasdasd
                </li>
              ))
              : <li>No hay notas...</li>
          }
        </ul>
      </section>
      <footer>actions</footer>
    </div>
  )
}

export default ActivityCard
