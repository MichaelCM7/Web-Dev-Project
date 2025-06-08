// Sample recipe data
const recipes = [
  {
    id: 1,
    name: "Mediterranean Quinoa Bowl",
    servings: 4,
    calories: 510,
    category: "vegetarian",
    image: "🥗",
  },
  {
    id: 2,
    name: "Grilled Salmon with Avocado",
    servings: 2,
    calories: 480,
    category: "keto",
    image: "🐟",
  },
  {
    id: 3,
    name: "Chicken & Vegetable Stir Fry",
    servings: 3,
    calories: 420,
    category: "low-carb",
    image: "🍗",
  },
  {
    id: 4,
    name: "Vegan Buddha Bowl",
    servings: 2,
    calories: 380,
    category: "vegan",
    image: "🥙",
  },
  {
    id: 5,
    name: "Turkey Meatball Zucchini",
    servings: 4,
    calories: 340,
    category: "paleo",
    image: "🥒",
  },
  {
    id: 6,
    name: "Gluten-Free Pasta Primavera",
    servings: 3,
    calories: 450,
    category: "gluten-free",
    image: "🍝",
  },
];

let favorites = new Set();

// Render recipes
function renderRecipes(recipesToRender = recipes) {
  const grid = document.getElementById("recipesGrid");

  grid.innerHTML = recipesToRender
    .map(
      (recipe) => `
                <div class="recipe-card">
                    <div class="recipe-image">
                        <span style="font-size: 3rem;">${recipe.image}</span>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div>
                                <div class="recipe-title">${recipe.name}</div>
                            </div>
                            <button class="favorite-btn ${
                              favorites.has(recipe.id) ? "active" : ""
                            }" 
                                    onclick="toggleFavorite(${recipe.id})">
                                ♥
                            </button>
                        </div>
                        <div class="recipe-stats">
                            <span>${recipe.servings} Servings</span>
                            <span>${recipe.calories} Cal</span>
                        </div>
                        <div class="recipe-buttons">
                            <button class="btn-view" onclick="viewRecipe(${
                              recipe.id
                            })">View Recipe</button>
                            <button class="btn-add" onclick="addToPlan(${
                              recipe.id
                            })">Add to Plan</button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

// Toggle favorite
function toggleFavorite(recipeId) {
  if (favorites.has(recipeId)) {
    favorites.delete(recipeId);
  } else {
    favorites.add(recipeId);
  }
  renderRecipes(getCurrentFilteredRecipes());
}

// Get current filtered recipes
function getCurrentFilteredRecipes() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const dietFilter = document.getElementById("dietFilter").value;

  return recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
    const matchesDiet = !dietFilter || recipe.category === dietFilter;
    return matchesSearch && matchesDiet;
  });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function () {
  renderRecipes(getCurrentFilteredRecipes());
});

// Diet filter functionality
document.getElementById("dietFilter").addEventListener("change", function () {
  renderRecipes(getCurrentFilteredRecipes());
});

// Recipe actions
function viewRecipe(recipeId) {
  const recipe = recipes.find((r) => r.id === recipeId);
  alert(
    `Viewing recipe: ${recipe.name}\n\nThis would open the detailed recipe page with ingredients, instructions, and nutritional information.`
  );
}

function addToPlan(recipeId) {
  const recipe = recipes.find((r) => r.id === recipeId);

  // Animation effect
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = "Added!";
  btn.style.background = "#2ed573";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "#00D2A0";
  }, 1500);

  alert(`${recipe.name} added to your meal plan!`);
}

// Navigation functions
function showSignIn() {
  alert("Redirecting to Sign In page...");
}

function getStarted() {
  alert("Redirecting to Sign Up page...");
}

function goHome() {
  alert("Redirecting to Home page...");
}

function goAbout() {
  alert("Redirecting to About page...");
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderRecipes();
});
