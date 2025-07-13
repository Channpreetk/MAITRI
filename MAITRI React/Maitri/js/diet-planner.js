// Diet Planner functionality
let selectedSymptoms = [];
let selectedGoals = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeDietPlanner();
    
    // Test jsPDF availability
    setTimeout(() => {
        if (window.jspdf) {
            console.log('jsPDF loaded successfully');
        } else {
            console.error('jsPDF failed to load');
        }
    }, 1000);
});

function initializeDietPlanner() {
    setupSymptomSelection();
    setupGoalSelection();
    setupFormSubmission();
}

// Symptom selection functionality
function setupSymptomSelection() {
    const symptomCards = document.querySelectorAll('.symptom-card');
    
    symptomCards.forEach(card => {
        card.addEventListener('click', function() {
            const symptom = this.getAttribute('data-symptom');
            
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
            } else {
                this.classList.add('selected');
                selectedSymptoms.push(symptom);
            }
            
            console.log('Selected symptoms:', selectedSymptoms);
        });
    });
}

// Goal selection functionality
function setupGoalSelection() {
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
        card.addEventListener('click', function() {
            const goal = this.getAttribute('data-goal');
            
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedGoals = selectedGoals.filter(g => g !== goal);
            } else {
                // Handle weight loss/weight gain mutual exclusion
                if (goal === 'weight-loss' && selectedGoals.includes('weight-gain')) {
                    // Remove weight-gain if selecting weight-loss
                    selectedGoals = selectedGoals.filter(g => g !== 'weight-gain');
                    document.querySelector('[data-goal="weight-gain"]').classList.remove('selected');
                    MaitriUtils.showToast('Weight gain goal removed - you can only select one weight goal at a time.', 'info');
                } else if (goal === 'weight-gain' && selectedGoals.includes('weight-loss')) {
                    // Remove weight-loss if selecting weight-gain
                    selectedGoals = selectedGoals.filter(g => g !== 'weight-loss');
                    document.querySelector('[data-goal="weight-loss"]').classList.remove('selected');
                    MaitriUtils.showToast('Weight loss goal removed - you can only select one weight goal at a time.', 'info');
                }
                
                this.classList.add('selected');
                selectedGoals.push(goal);
            }
            
            console.log('Selected goals:', selectedGoals);
        });
    });
}

// Form submission
function setupFormSubmission() {
    const form = document.getElementById('dietPlannerForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateDietPlan();
    });
}

// Generate diet plan based on selections
function generateDietPlan() {
    const formData = {
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        activityLevel: document.getElementById('activityLevel').value,
        dietType: document.getElementById('dietType').value,
        allergies: document.getElementById('allergies').value,
        symptoms: selectedSymptoms,
        goals: selectedGoals
    };
    
    console.log('Form data:', formData);
    
    // Validate required fields
    if (!formData.age || !formData.activityLevel || selectedSymptoms.length === 0) {
        MaitriUtils.showToast('Please fill in all required fields and select at least one symptom.', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('.btn[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating Your Plan...';
    
    // Simulate API call delay
    setTimeout(() => {
        const plan = createPersonalizedPlan(formData);
        displayDietPlan(plan);
        scrollToDietResults();
    }, 2000);
}

// Create personalized plan logic
function createPersonalizedPlan(data) {
    const plans = {
        'headache': {
            foods: ['Magnesium-rich foods (Spinach)', 'Water (Stay hydrated)', 'Ginger tea', 'Almonds', 'Quinoa'],
            avoid: ['Processed foods', 'Excess caffeine', 'Alcohol', 'MSG'],
            tips: 'Stay hydrated and maintain regular meal times.'
        },
        'fatigue': {
            foods: ['Bananas (Potassium)', 'Oats (Complex carbs)', 'Salmon (Omega-3)', 'Berries', 'Greek yogurt'],
            avoid: ['Sugary snacks', 'Refined carbs', 'Alcohol'],
            tips: 'Focus on iron-rich foods and B-vitamins.'
        },
        'period-issues': {
            foods: ['Red meat (Iron)', 'Dark leafy greens', 'Lentils', 'Dates', 'Turmeric'],
            avoid: ['Excess salt', 'Caffeine', 'Fried foods'],
            tips: 'Increase iron intake during menstruation.'
        },
        'mood-swings': {
            foods: ['Walnuts (Omega-3)', 'Dark chocolate', 'Avocados', 'Sweet potatoes', 'Chamomile tea'],
            avoid: ['Alcohol', 'High sugar foods', 'Processed snacks'],
            tips: 'Include foods rich in tryptophan and magnesium.'
        },
        'digestive': {
            foods: ['Probiotics (Yogurt)', 'Fiber-rich foods', 'Ginger', 'Peppermint tea', 'Papaya'],
            avoid: ['Spicy foods', 'Dairy (if intolerant)', 'Carbonated drinks'],
            tips: 'Eat smaller, frequent meals and stay hydrated.'
        },
        'skin-problems': {
            foods: ['Vitamin C fruits', 'Zinc-rich foods', 'Green tea', 'Sweet potatoes', 'Fatty fish'],
            avoid: ['Dairy', 'High glycemic foods', 'Processed foods'],
            tips: 'Focus on antioxidant-rich foods and omega-3s.'
        },
        'sleep-issues': {
            foods: ['Cherries (Melatonin)', 'Turkey', 'Warm milk', 'Almonds', 'Kiwi'],
            avoid: ['Caffeine after 2 PM', 'Heavy meals before bed', 'Alcohol'],
            tips: 'Avoid large meals 3 hours before bedtime.'
        },
        'stress': {
            foods: ['Green tea', 'Dark chocolate', 'Berries', 'Fatty fish', 'Nuts'],
            avoid: ['Excess caffeine', 'Alcohol', 'Sugary foods'],
            tips: 'Include foods rich in vitamin B complex and magnesium.'
        }
    };
    
    // Create combined plan based on symptoms
    let combinedPlan = {
        foods: [],
        avoid: [],
        tips: [],
        goals: data.goals
    };
    
    data.symptoms.forEach(symptom => {
        if (plans[symptom]) {
            combinedPlan.foods = [...combinedPlan.foods, ...plans[symptom].foods];
            combinedPlan.avoid = [...combinedPlan.avoid, ...plans[symptom].avoid];
            combinedPlan.tips.push(plans[symptom].tips);
        }
    });
    
    // Remove duplicates
    combinedPlan.foods = [...new Set(combinedPlan.foods)];
    combinedPlan.avoid = [...new Set(combinedPlan.avoid)];
    
    return combinedPlan;
}

// Display the generated diet plan
function displayDietPlan(plan) {
    const resultsSection = document.getElementById('dietResults');
    const contentDiv = document.getElementById('dietPlanContent');
    
    let html = `
        <div class="card diet-results-card mb-4">
            <div class="card-header text-center">
                <h3><i class="fas fa-heart me-2"></i>Your Personalized Wellness Plan</h3>
                <p class="mb-0">Customized recommendations based on your health profile</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="result-card">
                            <h5><i class="fas fa-plus-circle me-2"></i>Recommended Foods</h5>
                            <div class="food-list">
                                ${plan.foods.slice(0, 10).map(food => `
                                    <div class="food-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${food}</span>
                                    </div>
                                `).join('')}
                                <div id="moreFoods" class="d-none">
                                    ${plan.foods.slice(10).map(food => `
                                        <div class="food-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>${food}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                ${plan.foods.length > 10 ? `
                                    <button class="btn btn-sm btn-view-more mt-2" onclick="toggleMoreFoods()" id="viewMoreBtn">
                                        <i class="fas fa-chevron-down me-1"></i>View More (${plan.foods.length - 10} more)
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="result-card">
                            <h5><i class="fas fa-times-circle me-2"></i>Foods to Avoid</h5>
                            <div class="food-list">
                                ${plan.avoid.map(food => `
                                    <div class="food-item">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        <span>${food}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="result-card">
                            <h5><i class="fas fa-lightbulb me-2"></i>Personalized Tips</h5>
                            <ul class="tips-list">
                                ${plan.tips.map(tip => `<li><i class="fas fa-arrow-right text-pink me-2"></i>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-4">
            <div class="download-section">
                <h4><i class="fas fa-download me-2"></i>Download Your Complete Plan</h4>
                <p>Your personalized PDF includes diet recommendations, exercises, lifestyle tips, and progress tracking tools.</p>
                <button class="btn btn-download-pdf btn-lg me-3" onclick="downloadDietPlanWithFallback()">
                    <i class="fas fa-file-pdf"></i>Download PDF Plan
                </button>
                <button class="btn btn-outline-pink btn-lg" onclick="shareWithDoctor()">
                    <i class="fas fa-share me-2"></i>Share with Doctor
                </button>
            </div>
        </div>
    `;
    
    contentDiv.innerHTML = html;
    resultsSection.classList.remove('d-none');
    
    // Reset form button
    document.querySelector('.btn[type="submit"]').innerHTML = '<i class="fas fa-magic me-2"></i>Generate My Diet Plan';
    
    MaitriUtils.showToast('Your personalized diet plan is ready!', 'success');
}

// Scroll to results section
function scrollToDietResults() {
    const resultsSection = document.getElementById('dietResults');
    resultsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Download diet plan functionality (simplified)
function downloadDietPlan() {
    try {
        console.log('Download function called');
        
        // Check if jsPDF is available
        if (!window.jspdf) {
            console.error('jsPDF library not loaded');
            throw new Error('jsPDF library not available');
        }
        
        console.log('jsPDF library found');
        
        // Get the current diet plan from the displayed results
        const currentPlan = getCurrentDietPlan();
        console.log('Current plan:', currentPlan);
        
        // Initialize jsPDF with simpler approach
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        console.log('PDF document created');
        
        // Simple text-based PDF generation
        let yPos = 20;
        const leftMargin = 20;
        const lineHeight = 8;
        
        // Title
        doc.setFontSize(20);
        doc.setTextColor(233, 30, 99);
        doc.text('Maitri - Personalized Diet Plan', leftMargin, yPos);
        yPos += lineHeight * 2;
        
        // Date
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, leftMargin, yPos);
        yPos += lineHeight * 2;
        
        // Health Profile
        doc.setFontSize(14);
        doc.setTextColor(233, 30, 99);
        doc.text('Your Health Profile:', leftMargin, yPos);
        yPos += lineHeight;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        if (selectedSymptoms.length > 0) {
            doc.text(`Symptoms: ${selectedSymptoms.join(', ')}`, leftMargin, yPos);
            yPos += lineHeight;
        }
        if (selectedGoals.length > 0) {
            doc.text(`Goals: ${selectedGoals.join(', ')}`, leftMargin, yPos);
            yPos += lineHeight * 2;
        }
        
        // Recommended Foods
        doc.setFontSize(14);
        doc.setTextColor(233, 30, 99);
        doc.text('Recommended Foods:', leftMargin, yPos);
        yPos += lineHeight;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        currentPlan.foods.slice(0, 10).forEach(food => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`• ${food}`, leftMargin, yPos);
            yPos += lineHeight;
        });
        yPos += lineHeight;
        
        // Foods to Avoid
        doc.setFontSize(14);
        doc.setTextColor(233, 30, 99);
        doc.text('Foods to Avoid:', leftMargin, yPos);
        yPos += lineHeight;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        currentPlan.avoid.slice(0, 8).forEach(food => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`• ${food}`, leftMargin, yPos);
            yPos += lineHeight;
        });
        yPos += lineHeight;
        
        // Health Tips
        doc.setFontSize(14);
        doc.setTextColor(233, 30, 99);
        doc.text('Health Tips:', leftMargin, yPos);
        yPos += lineHeight;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        currentPlan.tips.slice(0, 5).forEach(tip => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            // Split long text
            const splitTip = doc.splitTextToSize(`• ${tip}`, 170);
            doc.text(splitTip, leftMargin, yPos);
            yPos += splitTip.length * lineHeight + 2;
        });
        
        // Disclaimer
        if (yPos > 230) {
            doc.addPage();
            yPos = 20;
        }
        yPos += lineHeight;
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        const disclaimer = 'Disclaimer: This diet plan is for informational purposes only. Please consult with a healthcare professional before making significant dietary changes.';
        const splitDisclaimer = doc.splitTextToSize(disclaimer, 170);
        doc.text(splitDisclaimer, leftMargin, yPos);
        
        // Save the PDF
        const fileName = `Maitri-Diet-Plan-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        console.log('PDF saved successfully');
        MaitriUtils.showToast('Your diet plan PDF has been downloaded!', 'success');
        
    } catch (error) {
        console.error('Detailed error generating PDF:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        // Try the text fallback instead
        console.log('Attempting text fallback due to PDF error');
        try {
            downloadDietPlanSimple();
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            MaitriUtils.showToast('Unable to download plan. Please check console for details.', 'error');
        }
    }
}

// Simple fallback download function
function downloadDietPlanSimple() {
    try {
        console.log('Using simple download fallback');
        
        const currentPlan = getCurrentDietPlan();
        
        // Create simple text content
        let content = `MAITRI - PERSONALIZED DIET PLAN
Generated on: ${new Date().toLocaleDateString()}

YOUR HEALTH PROFILE:
Symptoms: ${selectedSymptoms.join(', ')}
Goals: ${selectedGoals.join(', ')}

RECOMMENDED FOODS:
${currentPlan.foods.map(food => `• ${food}`).join('\n')}

FOODS TO AVOID:
${currentPlan.avoid.map(food => `• ${food}`).join('\n')}

HEALTH TIPS:
${currentPlan.tips.map(tip => `• ${tip}`).join('\n')}

---
Disclaimer: This plan is for informational purposes only. Consult with a healthcare professional before making significant dietary changes.
`;

        // Download as text file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Maitri-Diet-Plan-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        MaitriUtils.showToast('Diet plan downloaded as text file!', 'success');
        
    } catch (error) {
        console.error('Error in simple download:', error);
        MaitriUtils.showToast('Error downloading plan. Please try again.', 'error');
    }
}

// Updated download function with fallback
function downloadDietPlanWithFallback() {
    // First try PDF, then fallback to text
    if (window.jspdf) {
        downloadDietPlan();
    } else {
        console.log('jsPDF not available, using text fallback');
        downloadDietPlanSimple();
    }
}

// Test function for debugging
function testDownload() {
    console.log('Test download function called');
    console.log('jsPDF available:', !!window.jspdf);
    console.log('Selected symptoms:', selectedSymptoms);
    console.log('Selected goals:', selectedGoals);
    
    if (selectedSymptoms.length === 0) {
        // Add some test data
        selectedSymptoms = ['headache', 'fatigue'];
        selectedGoals = ['weight-loss', 'energy-boost'];
        console.log('Added test data');
    }
    
    downloadDietPlanWithFallback();
}

// Helper function to get current diet plan data
function getCurrentDietPlan() {
    // This should match the plan generated in generateDietPlan function
    const plans = {
        'headache': {
            foods: ['Magnesium-rich foods (Spinach)', 'Water (Stay hydrated)', 'Ginger tea', 'Almonds', 'Quinoa'],
            avoid: ['Processed foods', 'Excess caffeine', 'Alcohol', 'MSG'],
            tips: 'Stay hydrated and maintain regular meal times.'
        },
        'fatigue': {
            foods: ['Bananas (Potassium)', 'Oats (Complex carbs)', 'Salmon (Omega-3)', 'Berries', 'Greek yogurt'],
            avoid: ['Sugary snacks', 'Refined carbs', 'Alcohol'],
            tips: 'Focus on iron-rich foods and B-vitamins.'
        },
        'period-issues': {
            foods: ['Red meat (Iron)', 'Dark leafy greens', 'Lentils', 'Dates', 'Turmeric'],
            avoid: ['Excess salt', 'Caffeine', 'Fried foods'],
            tips: 'Increase iron intake during menstruation.'
        },
        'mood-swings': {
            foods: ['Walnuts (Omega-3)', 'Dark chocolate', 'Avocados', 'Sweet potatoes', 'Chamomile tea'],
            avoid: ['Alcohol', 'High sugar foods', 'Processed snacks'],
            tips: 'Include foods rich in tryptophan and magnesium.'
        },
        'digestive': {
            foods: ['Probiotics (Yogurt)', 'Fiber-rich foods', 'Ginger', 'Peppermint tea', 'Papaya'],
            avoid: ['Spicy foods', 'Dairy (if intolerant)', 'Carbonated drinks'],
            tips: 'Eat smaller, frequent meals and stay hydrated.'
        },
        'skin-problems': {
            foods: ['Vitamin C fruits', 'Zinc-rich foods', 'Green tea', 'Sweet potatoes', 'Fatty fish'],
            avoid: ['Dairy', 'High glycemic foods', 'Processed foods'],
            tips: 'Focus on antioxidant-rich foods and omega-3s.'
        },
        'sleep-issues': {
            foods: ['Cherries (Melatonin)', 'Turkey', 'Warm milk', 'Almonds', 'Kiwi'],
            avoid: ['Caffeine after 2 PM', 'Heavy meals before bed', 'Alcohol'],
            tips: 'Avoid large meals 3 hours before bedtime.'
        },
        'stress': {
            foods: ['Green tea', 'Dark chocolate', 'Berries', 'Fatty fish', 'Nuts'],
            avoid: ['Excess caffeine', 'Alcohol', 'Sugary foods'],
            tips: 'Include foods rich in vitamin B complex and magnesium.'
        }
    };
    
    let combinedPlan = {
        foods: [],
        avoid: [],
        tips: [],
        goals: selectedGoals
    };
    
    selectedSymptoms.forEach(symptom => {
        if (plans[symptom]) {
            combinedPlan.foods = [...combinedPlan.foods, ...plans[symptom].foods];
            combinedPlan.avoid = [...combinedPlan.avoid, ...plans[symptom].avoid];
            combinedPlan.tips.push(plans[symptom].tips);
        }
    });
    
    // Remove duplicates
    combinedPlan.foods = [...new Set(combinedPlan.foods)];
    combinedPlan.avoid = [...new Set(combinedPlan.avoid)];
    
    return combinedPlan;
}

// Share with doctor functionality
function shareWithDoctor() {
    MaitriUtils.showToast('Feature coming soon! You can save your plan and share it manually.', 'info');
}

// Toggle more foods visibility
function toggleMoreFoods() {
    const moreFoodsDiv = document.getElementById('moreFoods');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    if (moreFoodsDiv.classList.contains('d-none')) {
        moreFoodsDiv.classList.remove('d-none');
        viewMoreBtn.innerHTML = '<i class="fas fa-chevron-up me-1"></i>View Less';
    } else {
        moreFoodsDiv.classList.add('d-none');
        const extraCount = document.querySelectorAll('#moreFoods .food-item').length;
        viewMoreBtn.innerHTML = `<i class="fas fa-chevron-down me-1"></i>View More (${extraCount} more)`;
    }
}

console.log('Diet planner initialized successfully!');
