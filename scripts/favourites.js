        // Sample favourite recipes data
        const favouriteRecipes = [
            {
                id: 1,
                name: "Mediterranean Quinoa Bowl",
                calories: 510,
                servings: 4,
                image: "🥗",
                dateAdded: "2025-01-15"
            },
            {
                id: 2,
                name: "Grilled Salmon with Avocado",
                calories: 480,
                servings: 2,
                image: "🐟",
                dateAdded: "2025-01-12"
            },
            {
                id: 3,
                name: "Chicken & Vegetable Stir Fry",
                calories: 420,
                servings: 3,
                image: "🍗",
                dateAdded: "2025-01-10"
            },
            {
                id: 4,
                name: "Vegan Buddha Bowl",
                calories: 380,
                servings: 2,
                image: "🥙",
                dateAdded: "2025-01-08"
            },
            {
                id: 5,
                name: "Turkey Meatball Zucchini",
                calories: 340,
                servings: 4,
                image: "🥒",
                dateAdded: "2025-01-05"
            },
            {
                id: 6,
                name: "Gluten-Free Pasta Primavera",
                calories: 450,
                servings: 3,
                image: "🍝",
                dateAdded: "2025-01-03"
            },
            {
                id: 7,
                name: "Protein Pancakes Stack",
                calories: 320,
                servings: 2,
                image: "🥞",
                dateAdded: "2025-01-01"
            },
            {
                id: 8,
                name: "Avocado Toast Deluxe",
                calories: 280,
                servings: 1,
                image: "🥑",
                dateAdded: "2024-12-28"
            },
            {
                id: 9,
                name: "Herb Roasted Chicken",
                calories: 540,
                servings: 4,
                image: "🍗",
                dateAdded: "2024-12-25"
            }
        ];

        // Render favourite recipes
        function renderFavourites() {
            const grid = document.getElementById('favouritesGrid');
            const emptyState = document.getElementById('emptyState');
            
            if (favouriteRecipes.length === 0) {
                grid.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }
            
            grid.style.display = 'grid';
            emptyState.style.display = 'none';
            
            grid.innerHTML = favouriteRecipes.map(recipe => `
                <div class="favourite-card">
                    <div class="favourite-badge">♥</div>
                    <div class="recipe-image">
                        <span>${recipe.image}</span>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-title">${recipe.name}</div>
                        <div class="recipe-stats">${recipe.calories} Cal Per Servings</div>
                        <div class="recipe-buttons">
                            <button class="btn-view" onclick="viewRecipe(${recipe.id})">View Recipe</button>
                            <button class="btn-remove" onclick="removeFromFavourites(${recipe.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            updateStats();
        }

        // Update statistics
        function updateStats() {
            const totalFavourites = favouriteRecipes.length;
            const avgCalories = Math.round(favouriteRecipes.reduce((sum, recipe) => sum + recipe.calories, 0) / totalFavourites) || 0;
            const totalCookTime = (totalFavourites * 0.43).toFixed(1); // Estimated cooking time
            
            document.getElementById('totalFavourites').textContent = totalFavourites;
            document.getElementById('avgCalories').textContent = avgCalories;
            document.getElementById('totalCookTime').textContent = totalCookTime;
        }

        // View recipe details
        function viewRecipe(recipeId) {
            const recipe = favouriteRecipes.find(r => r.id === recipeId);
            alert(`Viewing recipe: ${recipe.name}\n\nThis would open the detailed recipe page with ingredients, instructions, and nutritional information.`);
        }

        // Remove recipe from favourites
        function removeFromFavourites(recipeId) {
            const recipe = favouriteRecipes.find(r => r.id === recipeId);
            
            if (confirm(`Are you sure you want to remove "${recipe.name}" from your favourites?`)) {
                // Find and remove the recipe
                const index = favouriteRecipes.findIndex(r => r.id === recipeId);
                if (index > -1) {
                    favouriteRecipes.splice(index, 1);
                }
                
                // Show success feedback
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #e53e3e;
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    animation: slideInRight 0.3s ease;
                `;
                notification.textContent = `${recipe.name} removed from favourites`;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
                
                // Re-render the grid
                renderFavourites();
            }
        }

        // Navigation functions
        /*
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

        function goAbout() {
            alert('Redirecting to About page...');
        }
        */

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

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderFavourites();
        });