const recipeData = {
            name: "Mediterranean Quinoa Bowl",
            baseCalories: 510,
            baseServings: 4,
            ingredients: [
                { name: "Quinoa", amount: 1, unit: "cup" },
                { name: "Cherry tomatoes", amount: 1, unit: "cup" },
                { name: "Cucumber", amount: 1, unit: "piece" },
                { name: "Red bell pepper", amount: 1, unit: "piece" },
                { name: "Red onion", amount: 1, unit: "cup" },
                { name: "Feta cheese", amount: 1, unit: "cup" },
                { name: "Kalamata olives", amount: 1, unit: "cup" },
                { name: "Lemon juice", amount: 2.0, unit: "tbsp" },
                { name: "Fresh parsley", amount: 3.0, unit: "tbsp" },
                { name: "Olive oil", amount: 2.0, unit: "tbsp" },
                { name: "Tahini", amount: 2.0, unit: "tbsp" },
                { name: "Garlic", amount: 2, unit: "cloves" }
            ]
        };

        let currentServings = 4;
        let isFavorite = false;

        // Initialize the page
        function initializePage() {
            updateServingsDisplay();
            renderIngredients();
        }

        // Update servings display
        function updateServingsDisplay() {
            document.getElementById('currentServings').textContent = currentServings;
            document.getElementById('ingredientServings').textContent = currentServings;
            
            // Update calories
            const newCalories = Math.round((recipeData.baseCalories * currentServings) / recipeData.baseServings);
            document.getElementById('recipeCalories').textContent = newCalories;
        }

        // Render ingredients with adjusted amounts
        function renderIngredients() {
            const ingredientsList = document.getElementById('ingredientsList');
            const multiplier = currentServings / recipeData.baseServings;
            
            ingredientsList.innerHTML = recipeData.ingredients.map(ingredient => {
                const adjustedAmount = (ingredient.amount * multiplier).toFixed(1);
                const displayAmount = adjustedAmount.endsWith('.0') ? 
                    parseInt(adjustedAmount) : adjustedAmount;
                
                return `
                    <li class="ingredient-item">
                        <span class="ingredient-name">${ingredient.name}</span>
                        <span class="ingredient-amount">${displayAmount} ${ingredient.unit}</span>
                    </li>
                `;
            }).join('');
        }

        // Increase servings
        function increaseServings() {
            if (currentServings < 12) {
                currentServings++;
                updateServingsDisplay();
                renderIngredients();
            }
        }

        // Decrease servings
        function decreaseServings() {
            if (currentServings > 1) {
                currentServings--;
                updateServingsDisplay();
                renderIngredients();
            }
        }

        // Toggle favorite
        function toggleFavorite() {
            const btn = document.getElementById('favoriteBtn');
            isFavorite = !isFavorite;
            
            if (isFavorite) {
                btn.textContent = '♥';
                btn.classList.add('active');
                showNotification('Added to favorites!', '#00D2A0');
            } else {
                btn.textContent = '♡';
                btn.classList.remove('active');
                showNotification('Removed from favorites', '#e53e3e');
            }
        }

        // Add to meal plan
        function addToPlan() {
            const btn = event.target;
            const originalText = btn.textContent;
            
            // Animation effect
            btn.textContent = 'Adding...';
            btn.style.background = '#40E0D0';
            
            setTimeout(() => {
                btn.textContent = '✓ Added!';
                btn.style.background = '#2ed573';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#00D2A0';
                }, 1500);
            }, 1000);
            
            showNotification(`${recipeData.name} added to your meal plan for ${currentServings} servings!`, '#00D2A0');
        }

        // Show notification
        function showNotification(message, color) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${color};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideInRight 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Navigation functions
        function goBack() {
            alert('Navigating back to Recipes page...');
        }

        function showSignIn() {
            alert('Redirecting to Sign In page...');
        }

        function getStarted() {
            alert('Redirecting to Sign Up page...');
        }

        function goHome() {
            alert('Redirecting to Home page...');
        }

        function goRecipes() {
            alert('Redirecting to Recipes page...');
        }

        function goMealPlans() {
            alert('Redirecting to Meal Plans page...');
        }

        function goFavourites() {
            alert('Redirecting to Favourites page...');
        }

        function goAbout() {
            alert('Redirecting to About page...');
        }

        // Add CSS animation for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize the page when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializePage);