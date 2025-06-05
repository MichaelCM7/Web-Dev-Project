 // Meal planning functionality
        function getShoppingList() {
            // Animation effect
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Generating List...';
            btn.style.background = '#40E0D0';
            
            setTimeout(() => {
                btn.textContent = '✓ List Ready!';
                btn.style.background = '#2ed573';
                
                setTimeout(() => {
                    alert('Your shopping list has been generated with all the ingredients from your planned meals!');
                    btn.textContent = originalText;
                    btn.style.background = '#00D2A0';
                }, 1500);
            }, 2000);
        }

        function viewRecipe(recipeId) {
            alert(`Opening detailed recipe view for: ${recipeId}\n\nThis would show the full recipe with ingredients, instructions, and nutritional information.`);
        }

        function removeMeal(day, mealType) {
            if (confirm(`Are you sure you want to remove this ${mealType} from ${day}?`)) {
                alert(`${mealType} removed from ${day}. This slot is now available for a new recipe.`);
                // Here you would update the UI to show an empty meal card
            }
        }

        function browseRecipes(mealType) {
            alert(`Opening recipe browser filtered for ${mealType} recipes...`);
        }

        function addFromFavorites(day, mealType) {
            alert(`Opening your favorites to add a ${mealType} recipe to ${day}...`);
        }

        // Search functionality
        document.querySelectorAll('.search-input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value;
                    if (searchTerm.trim()) {
                        alert(`Searching for recipes: "${searchTerm}"`);
                    }
                }
            });
        });

        // Click search icons
        document.querySelectorAll('.search-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const searchTerm = input.value;
                if (searchTerm.trim()) {
                    alert(`Searching for recipes: "${searchTerm}"`);
                }
            });
        });

        // Navigation functions
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

        function goFavourites() {
            alert('Redirecting to Favourites page...');
        }

        function goAbout() {
            alert('Redirecting to About page...');
        }

        // Add hover effects to meal cards
        document.querySelectorAll('.meal-card, .empty-meal-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });