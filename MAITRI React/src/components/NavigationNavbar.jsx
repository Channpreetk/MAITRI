import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const NavigationNavbar = () => {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useUser()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

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
            {isAuthenticated ? (
              <div className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle d-flex align-items-center" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  style={{ textDecoration: 'none' }}
                >
                  <div 
                    className="user-avatar me-2"
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      backgroundColor: '#ffc0cb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-white fw-bold">{user?.name || 'User'}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
                  <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="nav-link profile-icon" to="/login">
                <i className="fas fa-user-circle fa-2x text-pink"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationNavbar
