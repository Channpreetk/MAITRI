import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'

// Import components
import Navbar from './components/Navbar'
import Home from './components/Home'
import Chatbot from './components/Chatbot'
import DietPlanner from './components/DietPlanner'
import Doctors from './components/Doctors'
import Community from './components/Community'
import Login from './components/Login'
import Footer from './components/Footer'

function AppContent() {
  const location = useLocation()
  const hiddenFooterRoutes = ['/chatbot']
  const shouldHideFooter = hiddenFooterRoutes.includes(location.pathname)

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/diet-planner" element={<DietPlanner />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
