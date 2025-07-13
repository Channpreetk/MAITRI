import { useState } from 'react'
import { jsPDF } from 'jspdf'

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
    { id: 'headaches', label: 'Headaches', icon: 'fa-head-side-virus' },
    { id: 'fatigue', label: 'Fatigue', icon: 'fa-battery-quarter' },
    { id: 'period-issues', label: 'Period Issues', icon: 'fa-calendar-alt' },
    { id: 'mood-swings', label: 'Mood Swings', icon: 'fa-face-frown' },
    { id: 'digestive', label: 'Digestive Issues', icon: 'fa-pills' },
    { id: 'skin-problems', label: 'Skin Problems', icon: 'fa-face-sad-tear' },
    { id: 'sleep-issues', label: 'Sleep Issues', icon: 'fa-bed' },
    { id: 'stress', label: 'Stress/Anxiety', icon: 'fa-brain' },
    { id: 'hair-loss', label: 'Hair Loss', icon: 'fa-user-alt-slash' }
  ]

  const healthGoals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: 'fa-weight-scale' },
    { id: 'weight-gain', label: 'Weight Gain', icon: 'fa-dumbbell' },
    { id: 'energy-boost', label: 'Energy Boost', icon: 'fa-bolt' },
    { id: 'better-skin', label: 'Better Skin', icon: 'fa-face-smile' },
    { id: 'hormonal-balance', label: 'Hormonal Balance', icon: 'fa-balance-scale' },
    { id: 'digestive-health', label: 'Digestive Health', icon: 'fa-leaf' }
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

  const downloadPDF = async () => {
    // Generate automatic filename with timestamp for uniqueness
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')
    const dateStr = timestamp[0] // YYYY-MM-DD
    const timeStr = timestamp[1].split('.')[0] // HH-MM-SS
    const fileName = `Maitri_Diet_Plan_${dateStr}_${timeStr}.pdf`

    // Create a new PDF document
    const doc = new jsPDF()
    
    // Set up fonts and colors
    const primaryColor = [233, 30, 99] // Pink color for headings
    const textColor = [44, 62, 80] // Dark text color
    
    let yPosition = 20
    const lineHeight = 6
    const pageWidth = doc.internal.pageSize.width
    const leftMargin = 20
    const rightMargin = 20
    const contentWidth = pageWidth - leftMargin - rightMargin

    // Helper function to add text with word wrapping
    const addWrappedText = (text, x, y, maxWidth, fontSize = 10, color = textColor) => {
      doc.setFontSize(fontSize)
      doc.setTextColor(...color)
      const lines = doc.splitTextToSize(text, maxWidth)
      lines.forEach((line, index) => {
        if (y + (index * lineHeight) > 280) { // Check if we need a new page
          doc.addPage()
          y = 20
        }
        doc.text(line, x, y + (index * lineHeight))
      })
      return y + (lines.length * lineHeight)
    }

    // Helper function to add section header
    const addSectionHeader = (title, y) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor)
      doc.setFont(undefined, 'bold')
      doc.text(title, leftMargin, y)
      doc.setFont(undefined, 'normal')
      return y + 10
    }

    // Title
    doc.setFontSize(20)
    doc.setTextColor(...primaryColor)
    doc.setFont(undefined, 'bold')
    doc.text('MAITRI PERSONALIZED DIET PLAN', leftMargin, yPosition)
    yPosition += 15

    // Subtitle
    doc.setFontSize(12)
    doc.setTextColor(...textColor)
    doc.setFont(undefined, 'normal')
    yPosition = addWrappedText(`Generated on ${new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, leftMargin, yPosition, contentWidth, 12)
    yPosition += 10

    // Daily Calorie Target
    yPosition = addSectionHeader('DAILY CALORIE TARGET', yPosition)
    yPosition = addWrappedText(`${dietPlan.dailyCalories} calories per day`, leftMargin, yPosition, contentWidth, 12, primaryColor)
    yPosition += 10

    // Personal Information
    yPosition = addSectionHeader('PERSONAL INFORMATION', yPosition)
    const personalInfo = [
      `Age: ${formData.age} years`,
      `Weight: ${formData.weight} kg`,
      `Height: ${formData.height} cm`,
      `Activity Level: ${formData.activityLevel.charAt(0).toUpperCase() + formData.activityLevel.slice(1)}`
    ]
    personalInfo.forEach(info => {
      yPosition = addWrappedText(`• ${info}`, leftMargin, yPosition, contentWidth)
      yPosition += 2
    })
    yPosition += 5

    // Selected Symptoms
    yPosition = addSectionHeader('SELECTED SYMPTOMS', yPosition)
    if (formData.symptoms.length > 0) {
      formData.symptoms.forEach(symptom => {
        const symptomObj = symptoms.find(s => s.id === symptom)
        yPosition = addWrappedText(`• ${symptomObj?.label || symptom}`, leftMargin, yPosition, contentWidth)
        yPosition += 2
      })
    } else {
      yPosition = addWrappedText('• None selected', leftMargin, yPosition, contentWidth)
    }
    yPosition += 5

    // Health Goals
    yPosition = addSectionHeader('HEALTH GOALS', yPosition)
    if (formData.healthGoals.length > 0) {
      formData.healthGoals.forEach(goal => {
        const goalObj = healthGoals.find(g => g.id === goal)
        yPosition = addWrappedText(`• ${goalObj?.label || goal}`, leftMargin, yPosition, contentWidth)
        yPosition += 2
      })
    } else {
      yPosition = addWrappedText('• None selected', leftMargin, yPosition, contentWidth)
    }
    yPosition += 5

    // Dietary Preferences
    yPosition = addSectionHeader('DIETARY PREFERENCES', yPosition)
    yPosition = addWrappedText(`Diet Type: ${formData.dietaryPreferences ? formData.dietaryPreferences.charAt(0).toUpperCase() + formData.dietaryPreferences.slice(1) : 'Not specified'}`, leftMargin, yPosition, contentWidth)
    yPosition += 2
    yPosition = addWrappedText(`Allergies/Intolerances: ${formData.allergies || 'None specified'}`, leftMargin, yPosition, contentWidth)
    yPosition += 10

    // Recommendations
    yPosition = addSectionHeader('PERSONALIZED RECOMMENDATIONS', yPosition)
    dietPlan.recommendations.forEach((rec, index) => {
      yPosition = addWrappedText(`${index + 1}. ${rec.title}`, leftMargin, yPosition, contentWidth, 11, primaryColor)
      yPosition += 2
      yPosition = addWrappedText(`   ${rec.description}`, leftMargin, yPosition, contentWidth)
      yPosition += 5
    })

    // Sample Meal Plan
    yPosition = addSectionHeader('SAMPLE MEAL PLAN', yPosition)
    
    const mealTypes = [
      { key: 'breakfast', label: 'BREAKFAST' },
      { key: 'lunch', label: 'LUNCH' },
      { key: 'dinner', label: 'DINNER' },
      { key: 'snacks', label: 'SNACKS' }
    ]

    mealTypes.forEach(mealType => {
      yPosition = addWrappedText(mealType.label + ':', leftMargin, yPosition, contentWidth, 11, primaryColor)
      yPosition += 2
      dietPlan.mealPlan[mealType.key].forEach(meal => {
        yPosition = addWrappedText(`• ${meal}`, leftMargin, yPosition, contentWidth)
        yPosition += 2
      })
      yPosition += 3
    })

    // Recommended Supplements
    yPosition = addSectionHeader('RECOMMENDED SUPPLEMENTS', yPosition)
    dietPlan.supplements.forEach((supplement, index) => {
      yPosition = addWrappedText(`${index + 1}. ${supplement.name}`, leftMargin, yPosition, contentWidth, 11, primaryColor)
      yPosition += 2
      yPosition = addWrappedText(`   Dosage: ${supplement.dosage}`, leftMargin, yPosition, contentWidth)
      yPosition += 2
      yPosition = addWrappedText(`   Reason: ${supplement.reason}`, leftMargin, yPosition, contentWidth)
      yPosition += 5
    })

    // Important Notes
    yPosition = addSectionHeader('IMPORTANT NOTES', yPosition)
    const notes = [
      'This diet plan is generated based on the information you provided',
      'Please consult with a healthcare professional before making significant dietary changes',
      'Individual nutritional needs may vary',
      'Monitor your body\'s response and adjust as needed'
    ]
    notes.forEach(note => {
      yPosition = addWrappedText(`• ${note}`, leftMargin, yPosition, contentWidth)
      yPosition += 3
    })

    // Footer
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }
    yPosition += 10
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text('Generated by Maitri Health Platform', leftMargin, yPosition)
    doc.text(`${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`, pageWidth - rightMargin - 30, yPosition)

    // Generate PDF as blob
    const pdfBlob = doc.output('blob')

    // Try to use File System Access API for choosing location (modern browsers)
    try {
      if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: 'PDF files',
              accept: {
                'application/pdf': ['.pdf'],
              },
            },
          ],
        })
        
        const writable = await fileHandle.createWritable()
        await writable.write(pdfBlob)
        await writable.close()
        
        alert('Diet plan saved successfully to your chosen location!')
        return
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error saving file:', error)
      } else {
        // User cancelled the save dialog
        return
      }
    }

    // Fallback: Use traditional download method for browsers that don't support File System Access API
    const url = URL.createObjectURL(pdfBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)

    alert('Diet plan downloaded successfully!')
  }

  return (
    <>
      <style jsx>{`
        :root {
          --primary-color: #e91e63;
          --secondary-color: #f8bbd9;
          --text-dark: #2c3e50;
          --text-light: #6c757d;
          --bg-light: #f8f9fa;
        }

        .diet-header {
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
          padding: 120px 0 40px;
          text-align: center;
        }

        .diet-form-section {
          background: #f8f9fa;
          min-height: 80vh;
        }

        .diet-form-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 40px;
        }

        .form-header {
          border-bottom: 2px solid var(--secondary-color);
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .form-section {
          margin-bottom: 40px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
          border-left: 4px solid var(--primary-color);
        }

        .section-title {
          color: var(--text-dark);
          margin-bottom: 20px;
          font-weight: 600;
        }

        .symptoms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .symptom-card {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .symptom-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.2);
        }

        .symptom-card.selected {
          border-color: var(--primary-color);
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
        }

        .symptom-card i {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 10px;
          display: block;
        }

        .symptom-card span {
          font-weight: 600;
          color: var(--text-dark);
          font-size: 0.9rem;
        }

        .goals-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .goal-card {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .goal-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.2);
        }

        .goal-card.selected {
          border-color: var(--primary-color);
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
        }

        .goal-card i {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 8px;
          display: block;
        }

        .goal-card span {
          font-weight: 600;
          color: var(--text-dark);
          font-size: 0.9rem;
        }

        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(233, 30, 99, 0.25);
        }

        .form-select:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(233, 30, 99, 0.25);
        }

        .text-pink {
          color: var(--primary-color) !important;
        }

        .btn-primary {
          background-color: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
          color: white !important;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .btn-primary:hover {
          background-color: #c2185b !important;
          border-color: #c2185b !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
        }

        @media (max-width: 768px) {
          .diet-form-card {
            padding: 20px;
          }
          
          .symptoms-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
          }
          
          .goals-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          
          .symptom-card, .goal-card {
            padding: 15px;
          }
          
          .symptom-card i, .goal-card i {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .diet-header {
            padding: 100px 0 60px;
          }
          
          .diet-form-card {
            padding: 15px;
          }
          
          .form-section {
            padding: 15px;
          }
          
          .goals-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      {/* Header Section */}
      <section className="diet-header">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Personalized <span className="text-pink">Diet Planner</span></h1>
            <p className="lead">Get customized nutrition recommendations based on your symptoms and health needs</p>
          </div>
        </div>
      </section>

      {/* Diet Planner Form */}
      <section className="diet-form-section py-5">
        <div className="container">
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
                            <option value="very">Very Active (6-7 days/week)</option>
                            <option value="extra">Extremely Active (2x/day)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Current Symptoms */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-heartbeat me-2"></i>Current Symptoms
                      </h5>
                      <p className="text-muted mb-3">Select any symptoms you're currently experiencing:</p>
                      <div className="symptoms-grid">
                        {symptoms.map(symptom => (
                          <div 
                            key={symptom.id} 
                            className={`symptom-card ${formData.symptoms.includes(symptom.id) ? 'selected' : ''}`}
                            onClick={() => handleCheckboxChange('symptoms', symptom.id)}
                          >
                            <i className={`fas ${symptom.icon}`}></i>
                            <span>{symptom.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Preferences */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-leaf me-2"></i>Dietary Preferences
                      </h5>
                      <div className="mb-3">
                        <label htmlFor="dietType" className="form-label">Diet Type</label>
                        <select 
                          className="form-select" 
                          name="dietaryPreferences"
                          value={formData.dietaryPreferences}
                          onChange={handleInputChange}
                        >
                          <option value="omnivore">Omnivore (No restrictions)</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="keto">Keto</option>
                          <option value="paleo">Paleo</option>
                          <option value="mediterranean">Mediterranean</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="allergies" className="form-label">Food Allergies/Intolerances</label>
                        <textarea 
                          className="form-control" 
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleInputChange}
                          rows="3" 
                          placeholder="List any food allergies or intolerances (e.g., nuts, dairy, gluten)"
                        ></textarea>
                      </div>
                    </div>

                    {/* Health Goals */}
                    <div className="form-section">
                      <h5 className="section-title">
                        <i className="fas fa-target me-2"></i>Health Goals
                      </h5>
                      <div className="goals-grid">
                        {healthGoals.map(goal => (
                          <div 
                            key={goal.id} 
                            className={`goal-card ${formData.healthGoals.includes(goal.id) ? 'selected' : ''}`}
                            onClick={() => handleCheckboxChange('healthGoals', goal.id)}
                          >
                            <i className={`fas ${goal.icon}`}></i>
                            <span>{goal.label}</span>
                          </div>
                        ))}
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
                    <button className="btn btn-primary" onClick={downloadPDF}>
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
