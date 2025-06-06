let currentQuestion = 1;
        const totalQuestions = 7;
        const answers = {};

        // Initialize the quiz
        function initializeQuiz() {
            updateProgress();
            updateNavigationButtons();
            attachEventListeners();
        }

        // Attach event listeners to options
        function attachEventListeners() {
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', function() {
                    const questionElement = this.closest('.question');
                    const questionNumber = questionElement.dataset.question;
                    const value = this.dataset.value;
                    
                    if (this.classList.contains('checkbox-option')) {
                        // Multiple select (allergies)
                        handleMultipleSelect(this, questionNumber, value);
                    } else {
                        // Single select
                        handleSingleSelect(questionElement, this, questionNumber, value);
                    }
                    
                    updateNavigationButtons();
                });
            });

            // Input fields
            document.getElementById('householdSize').addEventListener('input', function() {
                answers['6'] = { householdSize: this.value, dislikes: document.getElementById('dislikes').value };
                updateNavigationButtons();
            });

            document.getElementById('dislikes').addEventListener('input', function() {
                answers['6'] = { householdSize: document.getElementById('householdSize').value, dislikes: this.value };
                updateNavigationButtons();
            });
        }

        // Handle single select questions
        function handleSingleSelect(questionElement, selectedOption, questionNumber, value) {
            // Remove selection from other options
            questionElement.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selection to clicked option
            selectedOption.classList.add('selected');
            answers[questionNumber] = value;
        }

        // Handle multiple select questions (allergies)
        function handleMultipleSelect(selectedOption, questionNumber, value) {
            selectedOption.classList.toggle('selected');
            
            if (!answers[questionNumber]) {
                answers[questionNumber] = [];
            }
            
            if (selectedOption.classList.contains('selected')) {
                if (!answers[questionNumber].includes(value)) {
                    answers[questionNumber].push(value);
                }
            } else {
                answers[questionNumber] = answers[questionNumber].filter(item => item !== value);
            }

            // If "none" is selected, deselect all others
            if (value === 'none' && selectedOption.classList.contains('selected')) {
                const questionElement = selectedOption.closest('.question');
                questionElement.querySelectorAll('.option').forEach(opt => {
                    if (opt.dataset.value !== 'none') {
                        opt.classList.remove('selected');
                    }
                });
                answers[questionNumber] = ['none'];
            } else if (value !== 'none' && selectedOption.classList.contains('selected')) {
                // If any other option is selected, deselect "none"
                const questionElement = selectedOption.closest('.question');
                const noneOption = questionElement.querySelector('[data-value="none"]');
                if (noneOption) {
                    noneOption.classList.remove('selected');
                    answers[questionNumber] = answers[questionNumber].filter(item => item !== 'none');
                }
            }
        }

        // Update progress bar and dots
        function updateProgress() {
            const progress = (currentQuestion / totalQuestions) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Update step dots
            document.querySelectorAll('.step-dot').forEach((dot, index) => {
                dot.classList.remove('active', 'completed');
                if (index + 1 < currentQuestion) {
                    dot.classList.add('completed');
                } else if (index + 1 === currentQuestion) {
                    dot.classList.add('active');
                }
            });
        }

        // Update navigation buttons
        function updateNavigationButtons() {
            const backBtn = document.getElementById('backBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            // Show/hide back button
            if (currentQuestion > 1) {
                backBtn.style.display = 'block';
            } else {
                backBtn.style.display = 'none';
            }
            
            // Update next button
            if (currentQuestion === totalQuestions) {
                nextBtn.textContent = 'Complete Setup →';
                nextBtn.className = 'btn-submit';
            } else {
                nextBtn.textContent = 'Next →';
                nextBtn.className = 'btn-next';
            }
            
            // Enable/disable next button based on answers
            const hasAnswer = checkCurrentQuestionAnswered();
            nextBtn.disabled = !hasAnswer;
        }

        // Check if current question is answered
        function checkCurrentQuestionAnswered() {
            const answer = answers[currentQuestion];
            
            if (currentQuestion === 3) {
                // Allergies - multiple select
                return answer && answer.length > 0;
            } else if (currentQuestion === 6) {
                // Household info
                return answer && answer.householdSize && parseInt(answer.householdSize) > 0;
            } else {
                // Single select questions
                return answer !== undefined;
            }
        }

        // Navigate to next question
        function nextQuestion() {
            if (currentQuestion === totalQuestions) {
                completeQuiz();
                return;
            }
            
            if (!checkCurrentQuestionAnswered()) return;
            
            // Hide current question
            document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
            
            currentQuestion++;
            
            // Show next question
            document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
            
            updateProgress();
            updateNavigationButtons();
        }

        // Navigate to previous question
        function previousQuestion() {
            if (currentQuestion <= 1) return;
            
            // Hide current question
            document.querySelector(`[data-question="${currentQuestion}"]`).classList.remove('active');
            
            currentQuestion--;
            
            // Show previous question
            document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
            
            updateProgress();
            updateNavigationButtons();
        }

        // Complete the quiz
        function completeQuiz() {
            // Show loading state
            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Setting up your profile...';
            submitBtn.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                submitBtn.textContent = '✓ Complete!';
                submitBtn.style.background = '#2ed573';
                
                setTimeout(() => {
                    // Show success message and redirect
                    alert(`Welcome to your personalized meal planning experience! 🎉\n\nWe've created a custom profile based on your preferences:\n• Goal: ${answers['1']}\n• Diet: ${answers['2']}\n• Household size: ${answers['6']?.householdSize || 1}\n\nRedirecting to your dashboard...`);
                    
                    // Here you would normally redirect to the main app
                    console.log('Quiz completed with answers:', answers);
                }, 1000);
            }, 2000);
            document.location.href='/pages/HomePage_SignedIn.html';
        }

        // Add floating particles effect
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp ${3 + Math.random() * 4}s linear forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 7000);
        }

        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Create particles periodically
        setInterval(createParticle, 500);

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', initializeQuiz);