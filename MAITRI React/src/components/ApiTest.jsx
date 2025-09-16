import { useState } from 'react'

const ApiTest = () => {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState({})

  const testAPI = async (endpoint, method = 'GET', body = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      }
  
      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(`http://localhost:8080${endpoint}`, options)
      const data = await response.text()
      
      return {
        status: response.ok ? 'SUCCESS' : 'FAILED',
        statusCode: response.status,
        data: data,
        error: null
      }
    } catch (error) {
      return {
        status: 'ERROR',
        statusCode: null,
        data: null,
        error: error.message
      }
    }
  }

  const testSingleAPI = async (apiName, endpoint, method = 'GET', body = null) => {
    setLoading(prev => ({ ...prev, [apiName]: true }))
    console.log(`Testing ${apiName}...`)
    const result = await testAPI(endpoint, method, body)
    setResults(prev => ({ ...prev, [apiName]: result }))
    setLoading(prev => ({ ...prev, [apiName]: false }))
  }

  const runAllTests = async () => {
    setLoading({ health: true, chat: true, auth: true })
    setResults({})

    // Test all APIs
    await testSingleAPI('health', '/api/chat/health')
    await testSingleAPI('chat', '/api/chat/message', 'POST', {
      message: 'test message',
      userId: 'test@test.com',
      timestamp: Date.now()
    })
    await testSingleAPI('auth', '/api/auth/health')
  }

  const clearResults = () => {
    setResults({})
    setLoading({})
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return '#28a745'
      case 'FAILED': return '#dc3545'
      case 'ERROR': return '#fd7e14'
      default: return '#6c757d'
    }
  }

  return (
    <div className="container-fluid" style={{ paddingTop: '80px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="fas fa-tools me-2"></i>
                API Testing Dashboard
              </h3>
              <small>Test all backend APIs to see if they're working</small>
            </div>
            
            <div className="card-body">
              {/* Control Buttons */}
              <div className="mb-4">
                <button 
                  onClick={runAllTests} 
                  disabled={Object.values(loading).some(l => l)}
                  className="btn btn-success me-3"
                >
                  {Object.values(loading).some(l => l) ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>
                      Testing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-play me-2"></i>
                      Run All Tests
                    </>
                  )}
                </button>
                
                <button 
                  onClick={clearResults}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-trash me-2"></i>
                  Clear Results
                </button>
              </div>

              {/* Individual API Tests */}
              <div className="row">
                {/* Chat Health API */}
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Chat Health API</h5>
                      <small className="text-muted">GET /api/chat/health</small>
                    </div>
                    <div className="card-body">
                      <button 
                        onClick={() => testSingleAPI('health', '/api/chat/health')}
                        disabled={loading.health}
                        className="btn btn-outline-info btn-sm w-100 mb-3"
                      >
                        {loading.health ? 'Testing...' : 'Test Health API'}
                      </button>
                      
                      {results.health && (
                        <div>
                          <p className="mb-1">
                            <strong>Status:</strong> 
                            <span style={{ color: getStatusColor(results.health.status), marginLeft: '5px' }}>
                              {results.health.status}
                            </span>
                          </p>
                          <p className="mb-1"><strong>HTTP:</strong> {results.health.statusCode || 'N/A'}</p>
                          <p className="mb-0 small">
                            <strong>Response:</strong><br/>
                            <code>{results.health.data || results.health.error}</code>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chat Message API */}
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Chat Message API</h5>
                      <small className="text-muted">POST /api/chat/message</small>
                    </div>
                    <div className="card-body">
                      <button 
                        onClick={() => testSingleAPI('chat', '/api/chat/message', 'POST', {
                          message: 'test message',
                          userId: 'test@test.com',
                          timestamp: Date.now()
                        })}
                        disabled={loading.chat}
                        className="btn btn-outline-warning btn-sm w-100 mb-3"
                      >
                        {loading.chat ? 'Testing...' : 'Test Chat API'}
                      </button>
                      
                      {results.chat && (
                        <div>
                          <p className="mb-1">
                            <strong>Status:</strong> 
                            <span style={{ color: getStatusColor(results.chat.status), marginLeft: '5px' }}>
                              {results.chat.status}
                            </span>
                          </p>
                          <p className="mb-1"><strong>HTTP:</strong> {results.chat.statusCode || 'N/A'}</p>
                          <p className="mb-0 small">
                            <strong>Response:</strong><br/>
                            <code>{results.chat.data || results.chat.error}</code>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Auth Health API */}
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Auth Health API</h5>
                      <small className="text-muted">GET /api/auth/health</small>
                    </div>
                    <div className="card-body">
                      <button 
                        onClick={() => testSingleAPI('auth', '/api/auth/health')}
                        disabled={loading.auth}
                        className="btn btn-outline-primary btn-sm w-100 mb-3"
                      >
                        {loading.auth ? 'Testing...' : 'Test Auth API'}
                      </button>
                      
                      {results.auth && (
                        <div>
                          <p className="mb-1">
                            <strong>Status:</strong> 
                            <span style={{ color: getStatusColor(results.auth.status), marginLeft: '5px' }}>
                              {results.auth.status}
                            </span>
                          </p>
                          <p className="mb-1"><strong>HTTP:</strong> {results.auth.statusCode || 'N/A'}</p>
                          <p className="mb-0 small">
                            <strong>Response:</strong><br/>
                            <code>{results.auth.data || results.auth.error}</code>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Status */}
              {Object.keys(results).length > 0 && (
                <div className="mt-4">
                  <div className="alert alert-info">
                    <h5>
                      <i className="fas fa-info-circle me-2"></i>
                      Overall Status
                    </h5>
                    <p className="mb-0">
                      Tests Completed: {Object.keys(results).length}/3 | 
                      Successful: {Object.values(results).filter(r => r.status === 'SUCCESS').length} | 
                      Failed: {Object.values(results).filter(r => r.status !== 'SUCCESS').length}
                    </p>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-4">
                <div className="alert alert-light">
                  <h6><i className="fas fa-lightbulb me-2"></i>Instructions:</h6>
                  <ul className="mb-0">
                    <li>Make sure your Spring Boot backend is running on <strong>localhost:8080</strong></li>
                    <li>Use "Run All Tests" to test all APIs at once</li>
                    <li>Use individual test buttons to test specific APIs</li>
                    <li>Check browser console for detailed error messages</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiTest
