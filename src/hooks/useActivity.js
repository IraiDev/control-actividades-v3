import { useContext, useEffect, useState } from 'react'
import { UiContext } from '../context/UiContext'
import { fetchToken } from '../helpers/fetch'

export const useActivity = () => {
  const { setIsLoading } = useContext(UiContext)
  const [activities, setActivities] = useState([])

  const fetchActivities = async () => {
    try {
      const resp = await fetchToken(`task/get-task-ra?id_actividad`, {}, 'POST')
      const body = await resp.json()
      const { ok, tareas } = body

      console.log(tareas)
      setIsLoading(false)

      if (ok) { setActivities(tareas) }
      else { console.log('Error') }

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchActivities()
    // eslint-disable-next-line
  }, [])

  return { activities }
}