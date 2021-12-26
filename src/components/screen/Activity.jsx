import { useActivity } from '../../hooks/useActivity'
import ActivityCard from '../card/ActivityCard'

const Activity = () => {

  const { activities } = useActivity()

  return (
    <>
      <section className='
        pt-10 pb-24 container mx-auto gap-3 grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      '>
        {
          activities.length > 0 &&
          activities.map((act, i) => (
            <ActivityCard
              key={i}
              numberCard={i + 1}
              {...act}
            />
          ))
        }
      </section>
      <footer className='fixed bottom-0 py-7 bg-gray-100 w-full'>foo</footer>
    </>
  )
}

export default Activity
