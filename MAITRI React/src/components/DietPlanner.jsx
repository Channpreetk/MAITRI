import { useState } from 'react'

const DietPlanner = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    symptoms: [],
    healthGoals: [],
    allergies: '',
    dietaryPreferences: ''
  })
  const [dietPlan, setDietPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const symptoms = [
    { id: 'headaches', label: 'Frequent Headaches', icon: 'fa-head-side-virus' },
    { id: 'fatigue', label: 'Fatigue/Low Energy', icon: 'fa-battery-quarter' },
    { id: 'irregular-periods', label: 'Irregular Periods', icon: 'fa-calendar-times' },
    { id: 'mood-swings', label: 'Mood Swings', icon: 'fa-emotion' },
    { id: 'digestive-issues', label: 'Digestive Issues', icon: 'fa-stomach' },
    { id: 'skin-problems', label: 'Skin Problems', icon: 'fa-spa' },
    { id: 'sleep-issues', label: 'Sleep Problems', icon: 'fa-bed' },
    { id: 'stress', label: 'High Stress Levels', icon: 'fa-brain' }
  ]

  const healthGoals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: 'fa-weight' },
    { id: 'weight-gain', label: 'Weight Gain', icon: 'fa-plus-circle' },
    { id: 'maintain-weight', label: 'Maintain Weight', icon: 'fa-balance-scale' },
    { id: 'increase-energy', label: 'Increase Energy', icon: 'fa-bolt' },
    { id: 'better-skin', label: 'Better Skin Health', icon: 'fa-spa' },
    { id: 'hormonal-balance', label: 'Hormonal Balance', icon: 'fa-yin-yang' },
    { id: 'digestive-health', label: 'Improve Digestion', icon: 'fa-stomach' },
    { id: 'general-wellness', label: 'General Wellness', icon: 'fa-heart' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (type, id) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(id) 
        ? prev[type].filter(item => item !== id)
        : [...prev[type], id]
    }))
  }

  const generateDietPlan = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const samplePlan = {
        dailyCalories: Math.round(1200 + (formData.weight * 15) + (formData.activityLevel === 'active' ? 300 : 100)),
        recommendations: generateRecommendations(),
        mealPlan: generateMealPlan(),
        supplements: generateSupplements()
      }
      
      setDietPlan(samplePlan)
      setIsLoading(false)
    }, 2000)
  }

  const generateRecommendations = () => {
    const recommendations = []
    
    if (formData.symptoms.includes('headaches')) {
      recommendations.push({
        title: 'Hydration & Magnesium',
        description: 'Increase water intake to 8-10 glasses daily. Include magnesium-rich foods like spinach, almonds, and dark chocolate.',
        icon: 'fa-tint'
      })
    }
    
    if (formData.symptoms.includes('fatigue')) {
      recommendations.push({
        title: 'Iron & B-Vitamins',
        description: 'Include iron-rich foods like lentils, spinach, and lean meats. Add B-vitamin sources like whole grains and leafy greens.',
        icon: 'fa-battery-full'
      })
    }
    
    if (formData.symptoms.includes('irregular-periods')) {
      recommendations.push({
        title: 'Omega-3 & Healthy Fats',
        description: 'Include fatty fish, walnuts, and flaxseeds. Maintain regular meal times and avoid excessive refined sugars.',
        icon: 'fa-fish'
      })
    }
    
    recommendations.push({
      title: 'Balanced Nutrition',
      description: 'Focus on whole foods, lean proteins, complex carbohydrates, and plenty of colorful vegetables.',
      icon: 'fa-apple-alt'
    })
    
    return recommendations
  }

  const generateMealPlan = () => {
    return {
      breakfast: [
        'Oatmeal with berries and nuts',
        'Greek yogurt with chia seeds',
        'Whole grain toast with avocado',
        'Smoothie with spinach and fruits'
      ],
      lunch: [
        'Quinoa salad with vegetables',
        'Lentil soup with whole grain bread',
        'Grilled chicken with sweet potato',
        'Chickpea curry with brown rice'
      ],
      dinner: [
        'Grilled salmon with roasted vegetables',
        'Turkey and vegetable stir-fry',
        'Bean and vegetable curry',
        'Grilled tofu with quinoa'
      ],
      snacks: [
        'Mixed nuts and seeds',
        'Apple with almond butter',
        'Hummus with vegetable sticks',
        'Greek yogurt with berries'
      ]
    }
  }

  const generateSupplements = () => {
    const supplements = []
    
    if (formData.symptoms.includes('fatigue')) {
      supplements.push({ name: 'Iron', dosage: 'As recommended by doctor', reason: 'For energy support' })
    }
    
    if (formData.symptoms.includes('irregular-periods')) {
      supplements.push({ name: 'Omega-3', dosage: '1000mg daily', reason: 'For hormonal balance' })
    }
    
    supplements.push(
      { name: 'Vitamin D', dosage: '1000-2000 IU daily', reason: 'General health support' },
      { name: 'Multivitamin', dosage: 'As directed', reason: 'Nutritional insurance' }
    )
    
    return supplements
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generateDietPlan()
  }

  return (
    <>
      {/* Header Section */}
      <section className="diet-header">
        <div className="container-fluid">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Personalized <span className="text-pink">Diet Planner</span></h1>
            <p className="lead">Get customized nutrition recommendations based on your symptoms and health needs</p>
          </div>
        </div>
      </section>

      {/* Diet Planner Form */}
      <section className="diet-form-section py-5">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {!dietPlan ? (
                <div className="diet-form-card">
                  <div className="form-header text-center mb-4">
                    <i className="fas fa-utensils fa-3x text-pink mb-3"></i>
                    <h3>Tell us about your health</h3>
                    <p className="text-muted">We'll create a personalized diet plan for you</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-user-circle me-2"></i>Basic Information
                      </h5>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="age" className="form-label">Age</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="13" 
                            max="100" 
                            required 
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="weight" className="form-label">Weight (kg)</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            min="30" 
                            max="200" 
                            step="0.1" 
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="height" className="form-label">Height (cm)</label>
                          <input 
                            type="number" 
                            className="form-control" 
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            min="120" 
                            max="220" 
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="activityLevel" className="form-label">Activity Level</label>
                          <select 
                            className="form-select" 
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select activity level</option>
                            <option value="sedentary">Sedentary (Little/No exercise)</option>
                            <option value="light">Light (1-3 days/week)</option>
                            <option value="moderate">Moderate (3-5 days/week)</option>
                            <option value="active">Active (6-7 days/week)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-stethoscope me-2"></i>Current Symptoms
                      </h5>
                      <p className="text-muted mb-3">Select any symptoms you're currently experiencing</p>
                      <div className="row">
                        {symptoms.map(symptom => (
                          <div key={symptom.id} className="col-md-6 mb-3">
                            <div className="form-check symptom-check">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={symptom.id}
                                checked={formData.symptoms.includes(symptom.id)}
                                onChange={() => handleCheckboxChange('symptoms', symptom.id)}
                              />
                              <label className="form-check-label" htmlFor={symptom.id}>
                                <i className={`fas ${symptom.icon} me-2 text-pink`}></i>
                                {symptom.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Health Goals */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-target me-2"></i>Health Goals
                      </h5>
                      <p className="text-muted mb-3">What are your primary health goals?</p>
                      <div className="row">
                        {healthGoals.map(goal => (
                          <div key={goal.id} className="col-md-6 mb-3">
                            <div className="form-check goal-check">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={goal.id}
                                checked={formData.healthGoals.includes(goal.id)}
                                onChange={() => handleCheckboxChange('healthGoals', goal.id)}
                              />
                              <label className="form-check-label" htmlFor={goal.id}>
                                <i className={`fas ${goal.icon} me-2 text-pink`}></i>
                                {goal.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-info-circle me-2"></i>Additional Information
                      </h5>
                      <div className="mb-3">
                        <label htmlFor="allergies" className="form-label">Allergies or Food Intolerances</label>
                        <textarea 
                          className="form-control" 
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleInputChange}
                          rows="3" 
                          placeholder="e.g., nuts, dairy, gluten..."
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="dietaryPreferences" className="form-label">Dietary Preferences</label>
                        <select 
                          className="form-select" 
                          name="dietaryPreferences"
                          value={formData.dietaryPreferences}
                          onChange={handleInputChange}
                        >
                          <option value="">No specific preference</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="pescatarian">Pescatarian</option>
                          <option value="keto">Keto</option>
                          <option value="paleo">Paleo</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Creating Your Plan...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-magic me-2"></i>
                            Generate My Diet Plan
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // Diet Plan Results
                <div className="diet-results">
                  <div className="results-header text-center mb-4">
                    <h3 className="text-pink">Your Personalized Diet Plan</h3>
                    <p className="text-muted">Based on your health profile and goals</p>
                  </div>

                  {/* Daily Calories */}
                  <div className="calories-card mb-4">
                    <div className="text-center">
                      <h4>Daily Calorie Target</h4>
                      <div className="calorie-number">{dietPlan.dailyCalories}</div>
                      <p className="text-muted">calories per day</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="recommendations-section mb-4">
                    <h5><i className="fas fa-lightbulb me-2 text-pink"></i>Personalized Recommendations</h5>
                    <div className="row">
                      {dietPlan.recommendations.map((rec, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="recommendation-card">
                            <div className="d-flex align-items-start">
                              <i className={`fas ${rec.icon} fa-2x text-pink me-3`}></i>
                              <div>
                                <h6>{rec.title}</h6>
                                <p className="mb-0">{rec.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meal Plan */}
                  <div className="meal-plan-section mb-4">
                    <h5><i className="fas fa-utensils me-2 text-pink"></i>Sample Meal Ideas</h5>
                    <div className="row">
                      {Object.entries(dietPlan.mealPlan).map(([mealType, meals]) => (
                        <div key={mealType} className="col-md-6 mb-4">
                          <div className="meal-card">
                            <h6 className="text-capitalize text-pink">{mealType}</h6>
                            <ul className="meal-list">
                              {meals.map((meal, index) => (
                                <li key={index}>{meal}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supplements */}
                  <div className="supplements-section mb-4">
                    <h5><i className="fas fa-pills me-2 text-pink"></i>Recommended Supplements</h5>
                    <div className="row">
                      {dietPlan.supplements.map((supplement, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="supplement-card">
                            <h6>{supplement.name}</h6>
                            <p className="mb-1"><strong>Dosage:</strong> {supplement.dosage}</p>
                            <p className="mb-0 text-muted">{supplement.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <button 
                      className="btn btn-outline-primary me-3" 
                      onClick={() => setDietPlan(null)}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Create New Plan
                    </button>
                    <button className="btn btn-primary">
                      <i className="fas fa-download me-2"></i>
                      Download Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DietPlanner
