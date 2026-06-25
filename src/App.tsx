import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Servicesandtools from './pages/Servicesandtools'
import Jurisdictions from './pages/Jurisdictions'
import Resources from './pages/Resources'
import Partner from './pages/Partner'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import OffshorePage from './pages/Offshore';
import Banking from './pages/Banking';
import NotarizationPage from './pages/Notarization';
import CompanyNameCheckerPage from './pages/CompanyNameChecker'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/services-and-tools" element={<Servicesandtools />} />
        <Route path="/jurisdictions"      element={<Jurisdictions />} />
        <Route path="/resources"          element={<Resources />} />
        <Route path="/partner"            element={<Partner />} />
        <Route path="/about"              element={<About />} />
        <Route path="/contact"            element={<Contact />} />
       <Route path="/offshore-company-formation" element={<OffshorePage />} />
        <Route path="/banking"            element={<Banking />} />
        <Route path="/notarization"       element={<NotarizationPage />} />
        <Route path="/company-name-checker" element={<CompanyNameCheckerPage />}/>
      </Routes>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  )
}

export default App