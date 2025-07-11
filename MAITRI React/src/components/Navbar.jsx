import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg fixed-top transparent-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-heart text-pink"></i> Maitri
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`} 
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/chatbot' ? 'active' : ''}`} 
                to="/chatbot"
              >
                AI Assistant
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/diet-planner' ? 'active' : ''}`} 
                to="/diet-planner"
              >
                Diet Planner
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/doctors' ? 'active' : ''}`} 
                to="/doctors"
              >
                Find Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} 
                to="/community"
              >
                Community
              </Link>
            </li>
          </ul>
          <div className="navbar-nav">
            <Link className="nav-link profile-icon" to="/login">
              <i className="fas fa-user-circle fa-2x text-pink"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
