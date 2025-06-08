// Navigation functions used across all pages
function showSignIn() {
  alert("Redirecting to Sign In page...");
}

function getStarted() {
  alert("Redirecting to Sign Up page...");
}

function goHome() {
  alert("Redirecting to Home page...");
}

function goRecipes() {
  alert("Redirecting to Recipes page...");
}

function goMealPlans() {
  alert("Redirecting to Meal Plans page...");
}

function goFavourites() {
  alert("Redirecting to Favourites page...");
}

function goAbout() {
  alert("Redirecting to About page...");
}

// Common notification system
function showNotification(message, color = "#00D2A0", duration = 3000) {
  const notification = document.createElement("div");
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
        font-weight: 500;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, duration);
}

// Common button animation helper
function animateButton(button, loadingText, successText, originalText) {
  button.textContent = loadingText;
  button.style.background = "#40E0D0";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = successText;
    button.style.background = "#2ed573";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "#00D2A0";
      button.disabled = false;
    }, 1500);
  }, 1000);
}

// Common hover effects for cards
function initializeCardHovers() {
  document
    .querySelectorAll(".card, .meal-card, .recipe-card, .favourite-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
}

// Initialize common functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeCardHovers();

  // Add slide-in animation CSS if not already present
  if (!document.querySelector("#commonAnimations")) {
    const style = document.createElement("style");
    style.id = "commonAnimations";
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
  }
});

// Common utility functions
const Utils = {
  // Format numbers with proper decimal places
  formatNumber: function (num, decimals = 1) {
    const formatted = num.toFixed(decimals);
    return formatted.endsWith(".0") ? parseInt(formatted) : formatted;
  },

  // Animate number counting
  animateNumber: function (element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.round(current);
    }, 16);
  },

  // Create ripple effect for buttons
  addRippleEffect: function (button) {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  },
};

// Add ripple animation CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { showNotification, animateButton, Utils };
}
