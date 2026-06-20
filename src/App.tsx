import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Servicesandtools from './pages/Servicesandtools'
import Jurisdictions from './pages/Jurisdictions'
import Resources from './pages/Resources'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/services-and-tools" element={<Servicesandtools />} />
        <Route path="/jurisdictions"      element={<Jurisdictions />} />
        <Route path="/resources"          element={<Resources />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App