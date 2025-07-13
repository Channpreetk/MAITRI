import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Login = () => {
  const navigate = useNavigate()
  const { login, signup } = useUser()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    age: '',
    agreeToTerms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      // Login logic
      if (formData.email && formData.password) {
        // In a real app, you would validate credentials with a backend
        const userData = {
          email: formData.email,
          name: 'User', // In real app, this would come from backend
          id: Date.now() // Simple ID generation
        }
        login(userData)
        alert('Login successful! Welcome back to Maitri.')
        navigate('/home')
      }
    } else {
      // Registration logic
      if (formData.email && formData.password && formData.name && 
          formData.password === formData.confirmPassword && formData.agreeToTerms) {
        const userData = {
          email: formData.email,
          name: formData.name,
          age: formData.age,
          id: Date.now(),
          joinedDate: new Date().toISOString()
        }
        signup(userData)
        alert(`Registration successful! Welcome to Maitri, ${formData.name}!`)
        navigate('/home')
      }
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      age: '',
      agreeToTerms: false
    })
  }

  return (

<section className="auth-section">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="auth-card" style={{marginTop: '100px'}}>
              <div className="auth-header text-center mb-3">
                <i className="fas fa-heart fa-3x text-pink mb-3"></i>
                <h2>Welcome to <span className="text-pink">Maitri</span></h2>
                <p className="text-muted">
                  {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                      min="13"
                      max="100"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                    {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                      <small className="text-danger">Passwords do not match</small>
                    )}
                  </div>
                )}

                {isLogin && (
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-pink text-decoration-none">Forgot password?</a>
                  </div>
                )}

                {!isLogin && (
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        required={!isLogin}
                      />
                      <label className="form-check-label">
                        I agree to the <a href="#" className="text-pink">Terms of Service</a> and{' '}
                        <a href="#" className="text-pink">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>

                <div className="text-center">
                  <span className="text-muted">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <button
                    type="button"
                    className="btn btn-link text-pink p-0 ms-2"
                    onClick={switchMode}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </form>

              <div className="divider my-0">
                <span className="divider-text">or continue with</span>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-outline-dark">
                  <i className="fab fa-google me-2"></i>
                  Continue with Google
                </button>
                {/* <button className="btn btn-outline-primary">
                  <i className="fab fa-facebook-f me-2"></i>
                  Continue with Facebook
                </button> */}
              </div>

              {!isLogin && (
                <div className="mt-3 p-3 bg-light rounded">
                  <h6 className="text-pink">Why join Maitri?</h6>
                  <ul className="list-unstyled small mb-0">
                    <li className="mb-1">
                      <i className="fas fa-check text-success me-2"></i>
                      Personalized health recommendations
                    </li>
                    <li className="mb-1">
                      <i className="fas fa-check text-success me-2"></i>
                      24/7 AI health assistant
                    </li>
                    <li className="mb-1">
                      <i className="fas fa-check text-success me-2"></i>
                      Connect with healthcare professionals
                    </li>
                    <li className="mb-0">
                      <i className="fas fa-check text-success me-2"></i>
                      Safe community of women
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-md-6 d-none d-md-block">
            <div className="auth-image-section text-center" style={{marginTop: '180px'}}>
              <i className="fas fa-heart-pulse fa-8x text-pink opacity-75 mb-4"></i>
              <h3 className="text-pink mb-3">Your Health, Our Priority</h3>
              <p className="text-muted lead">
                Join thousands of women who trust Maitri for their health and wellness journey.
              </p>
              <div className="row mt-5">
                <div className="col-6 text-center">
                  <i className="fas fa-users fa-2x text-pink mb-2"></i>
                  <div className="fw-bold">10,000+</div>
                  <small className="text-muted">Happy Users</small>
                </div>
                <div className="col-6 text-center">
                  <i className="fas fa-user-md fa-2x text-pink mb-2"></i>
                  <div className="fw-bold">500+</div>
                  <small className="text-muted">Verified Doctors</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
