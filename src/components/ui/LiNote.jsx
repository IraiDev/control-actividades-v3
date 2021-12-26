import moment from 'moment'
import React from 'react'

const LiNote = (props) => (
  <li
    className='mt-2 mr-0.5'
    key={props.id_nota}>
    <div className='flex justify-between'>
      <span className='font-bold mb-1'>{props.user_crea_nota.abrev_user}</span>
      <span>{moment(props.fecha_hora_crea).format('DD/MM/YYYY - HH:mm')}</span>
    </div>
    {props.desc_nota}
  </li>
)
export default LiNote
