function signupnav() {
  window.location.href = "/pages/quiz.html";
}

// Password strength checker
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");

passwordInput.addEventListener("input", function () {
  const password = this.value;
  const strength = calculatePasswordStrength(password);
  updateStrengthBar(strength);
});

function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return Math.min(strength, 4);
}

function updateStrengthBar(strength) {
  strengthBar.className = "password-strength-bar";
  switch (strength) {
    case 1:
    case 2:
      strengthBar.classList.add("strength-weak");
      break;
    case 3:
      strengthBar.classList.add("strength-fair");
      break;
    case 4:
      strengthBar.classList.add("strength-good");
      break;
    case 5:
      strengthBar.classList.add("strength-strong");
      break;
    default:
      strengthBar.style.width = "0%";
  }
}

// Form validation
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Simulate account creation
  const btn = document.querySelector(".btn-primary");
  const originalText = btn.textContent;
  btn.textContent = "Creating Account...";
  btn.style.background = "linear-gradient(135deg, #2ed573 0%, #17a2b8 100%)";

  setTimeout(() => {
    alert("Account created successfully! 🎉");
    btn.textContent = originalText;
    btn.style.background = "linear-gradient(135deg, #00d4ff 0%, #5b86e5 100%)";
  }, 2000);
});

// Social auth functions
function signInWithGoogle() {
  simulateAuthAction("Google");
}

function signInWithMicrosoft() {
  simulateAuthAction("Microsoft");
}

function signInWithApple() {
  simulateAuthAction("Apple");
}

// function simulateAuthAction(provider) {
//     alert(Redirecting to ${provider} authentication...);
// }

function showSignIn() {
  alert("Redirecting to Sign In page...");
}

function goHome() {
  alert("Returning to Home Page...");
}

// Add floating particles effect
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: 100%;
                animation: floatUp ${3 + Math.random() * 4}s linear forwards;
            `;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 7000);
}

// Add CSS for particle animation
const style = document.createElement("style");
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

// Add input animations
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});
