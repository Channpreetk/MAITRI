import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'

// Import components
import HomeNavbar from './components/HomeNavbar'
import NavigationNavbar from './components/NavigationNavbar'
import Home from './components/Home'
import Chatbot from './components/Chatbot'
import DietPlanner from './components/DietPlanner'
import Doctors from './components/Doctors'
import Community from './components/Community'
import Login from './components/Login'
import Footer from './components/Footer'

// Import UserContext
import { UserProvider } from './context/UserContext'

function AppContent() {
  const location = useLocation()
  const hiddenFooterRoutes = ['/chatbot']
  const shouldHideFooter = hiddenFooterRoutes.includes(location.pathname)
  
  // Use HomeNavbar for home page, NavigationNavbar for all other pages
  const isHomePage = location.pathname === '/' || location.pathname === '/home'

  return (
    <div className="App">
      {isHomePage ? <HomeNavbar /> : <NavigationNavbar />}
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
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  )
}

export default App
