import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Planner from '../components/screen/Planner'
import NavBar from '../components/ui/NavBar'

const DashRoutes = () => {
   return (
      <BrowserRouter>
         <NavBar />
         <Routes>
            <Route path="/actividades" element={<h1>Home</h1>} />
            <Route path="/detalle-actividad/:id" element={<h1>Home</h1>} />
            <Route path="/informe-tiempos" element={<h1>Home</h1>} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/" element={<Planner />} />
         </Routes>
      </BrowserRouter>
   )
}

export default DashRoutes
