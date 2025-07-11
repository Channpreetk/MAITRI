import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialization: 'Gynecologist',
      experience: '12 years',
      rating: 4.8,
      location: 'Mumbai',
      price: '₹800',
      image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=PS',
      availability: 'Available Today',
      languages: ['English', 'Hindi', 'Marathi'],
      education: 'MBBS, MD (Obstetrics & Gynecology)',
      about: 'Specialized in women\'s health and reproductive medicine with 12+ years of experience.'
    },
    {
      id: 2,
      name: 'Dr. Anita Patel',
      specialization: 'Dermatologist',
      experience: '8 years',
      rating: 4.6,
      location: 'Delhi',
      price: '₹600',
      image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=AP',
      availability: 'Available Tomorrow',
      languages: ['English', 'Hindi', 'Gujarati'],
      education: 'MBBS, MD (Dermatology)',
      about: 'Expert in skin care and cosmetic dermatology for women of all ages.'
    },
    {
      id: 3,
      name: 'Dr. Kavitha Reddy',
      specialization: 'Nutritionist',
      experience: '6 years',
      rating: 4.7,
      location: 'Bangalore',
      price: '₹500',
      image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=KR',
      availability: 'Available Today',
      languages: ['English', 'Telugu', 'Tamil'],
      education: 'MSc (Nutrition), PhD (Food Science)',
      about: 'Specialized in women\'s nutrition and therapeutic diet planning.'
    },
    {
      id: 4,
      name: 'Dr. Meera Singh',
      specialization: 'Psychiatrist',
      experience: '10 years',
      rating: 4.9,
      location: 'Chennai',
      price: '₹900',
      image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=MS',
      availability: 'Available Today',
      languages: ['English', 'Hindi', 'Tamil'],
      education: 'MBBS, MD (Psychiatry)',
      about: 'Mental health specialist focusing on women\'s psychological well-being.'
    },
    {
      id: 5,
      name: 'Dr. Rashni Gupta',
      specialization: 'General Physician',
      experience: '15 years',
      rating: 4.5,
      location: 'Pune',
      price: '₹400',
      image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=RG',
      availability: 'Available Tomorrow',
      languages: ['English', 'Hindi', 'Marathi'],
      education: 'MBBS, MD (Internal Medicine)',
      about: 'Primary care physician with extensive experience in women\'s health.'
    },
    {
      id: 6,
      name: 'Dr. Sunita Joshi',
      specialization: 'Endocrinologist',
      experience: '9 years',
      rating: 4.7,
      location: 'Hyderabad',
      price: '₹700',
      image: 'https://via.placeholder.com/150x150/e91e63/ffffff?text=SJ',
      availability: 'Available Today',
      languages: ['English', 'Hindi', 'Telugu'],
      education: 'MBBS, MD (Endocrinology)',
      about: 'Hormone specialist treating PCOS, thyroid, and diabetes in women.'
    }
  ]

  const specializations = [
    'All Specializations',
    'Gynecologist',
    'Dermatologist',
    'Nutritionist',
    'Psychiatrist',
    'General Physician',
    'Endocrinologist'
  ]

  const locations = [
    'All Locations',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Pune',
    'Hyderabad'
  ]

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = selectedSpecialization === '' || 
                                 selectedSpecialization === 'All Specializations' ||
                                 doctor.specialization === selectedSpecialization
    const matchesLocation = selectedLocation === '' || 
                           selectedLocation === 'All Locations' ||
                           doctor.location === selectedLocation
    
    return matchesSearch && matchesSpecialization && matchesLocation
  })

  const handleBookConsultation = (doctor) => {
    alert(`Booking consultation with ${doctor.name}. This feature will be available soon!`)
  }

  return (
    <>
      {/* Header Section */}
      <section className="hero-section doctors-hero">
        <div className="container-fluid">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Find <span className="text-pink">Doctors</span></h1>
            <p className="lead">Connect with qualified healthcare professionals</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="search-container bg-white p-4 rounded shadow">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Search Doctors</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Doctor name or specialization"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Specialization</label>
                    <select
                      className="form-select"
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                    >
                      {specializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Location</label>
                    <select
                      className="form-select"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Available Doctors ({filteredDoctors.length})</h3>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-filter me-2"></i>Filters
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-sort me-2"></i>Sort by Rating
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="col-lg-6 col-xl-4">
                <div className="doctor-card h-100">
                  <div className="card-header d-flex align-items-center">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="doctor-avatar me-3"
                    />
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{doctor.name}</h5>
                      <p className="text-pink mb-1">{doctor.specialization}</p>
                      <div className="d-flex align-items-center">
                        <div className="rating me-2">
                          <i className="fas fa-star text-warning"></i>
                          <span className="ms-1">{doctor.rating}</span>
                        </div>
                        <span className="text-muted">•</span>
                        <span className="ms-2 text-muted">{doctor.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {doctor.location}
                        </span>
                        <span className="fw-bold text-pink">{doctor.price}</span>
                      </div>
                      <div className="mb-2">
                        <span className={`badge ${doctor.availability.includes('Today') ? 'bg-success' : 'bg-warning'}`}>
                          {doctor.availability}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <strong>Education:</strong>
                      <p className="text-muted mb-2">{doctor.education}</p>
                    </div>

                    <div className="mb-3">
                      <strong>Languages:</strong>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {doctor.languages.map(lang => (
                          <span key={lang} className="badge bg-light text-dark">{lang}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-muted">{doctor.about}</p>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-primary flex-grow-1"
                        onClick={() => handleBookConsultation(doctor)}
                      >
                        <i className="fas fa-video me-2"></i>
                        Book Consultation
                      </button>
                      <button className="btn btn-outline-primary">
                        <i className="fas fa-heart"></i>
                      </button>
                      <button className="btn btn-outline-primary">
                        <i className="fas fa-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No doctors found</h4>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="text-center mb-5">
            <h3>Why Choose Maitri for Healthcare?</h3>
            <p className="text-muted">Experience the best in women's healthcare</p>
          </div>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <i className="fas fa-shield-alt fa-3x text-pink mb-3"></i>
              <h5>Verified Doctors</h5>
              <p className="text-muted">All doctors are verified and licensed professionals</p>
            </div>
            <div className="col-md-3 text-center">
              <i className="fas fa-clock fa-3x text-pink mb-3"></i>
              <h5>Quick Booking</h5>
              <p className="text-muted">Book consultations in just a few clicks</p>
            </div>
            <div className="col-md-3 text-center">
              <i className="fas fa-video fa-3x text-pink mb-3"></i>
              <h5>Online Consultations</h5>
              <p className="text-muted">Consult from the comfort of your home</p>
            </div>
            <div className="col-md-3 text-center">
              <i className="fas fa-lock fa-3x text-pink mb-3"></i>
              <h5>Secure & Private</h5>
              <p className="text-muted">Your health data is completely secure</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Doctors
