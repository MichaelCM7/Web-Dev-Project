// Form submission with enhanced animation
        document.getElementById('signinForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.querySelector('.signin-btn');
            const originalText = btn.textContent;
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            btn.appendChild(ripple);
            
            btn.textContent = 'Signing in...';
            btn.style.background = 'linear-gradient(135deg, #7FFFD4, #40E0D0)';
            btn.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                btn.textContent = '✓ Welcome!';
                btn.style.background = 'linear-gradient(135deg, #00D2A0, #20B2AA)';
                btn.style.transform = 'scale(1)';
                
                // Success animation
                btn.style.animation = 'successPulse 0.5s ease';
                
                setTimeout(() => {
                    // alert('Sign in functionality would be implemented here!');
                    btn.textContent = originalText;
                    btn.style.background = 'linear-gradient(135deg, #00D2A0, #40E0D0)';
                    btn.style.animation = '';
                    ripple.remove();
                    window.location.href = '/pages/HomePage_SignedIn.html';
                }, 1500);
            }, 2000);
        });

        // Enhanced social authentication functions
        function signInWithGoogle() {
            showAuthAnimation('Google', '#ea4335');
        }

        function signInWithMicrosoft() {
            showAuthAnimation('Microsoft', '#00a4ef');
        }

        function signInWithApple() {
            showAuthAnimation('Apple', '#000000');
        }

        function showAuthAnimation(provider, color) {
            const socialBtns = document.querySelectorAll('.social-btn');
            socialBtns.forEach(btn => {
                btn.style.filter = 'brightness(0.5)';
            });
            
            setTimeout(() => {
                socialBtns.forEach(btn => {
                    btn.style.filter = 'brightness(1)';
                });
                alert(`${provider} authentication would be implemented here! This would redirect to ${provider}'s OAuth flow.`);
            }, 800);
        }

        function showForgotPassword() {
            const card = document.querySelector('.signin-card');
            card.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                card.style.animation = '';
                alert('Forgot password functionality would be implemented here!');
            }, 500);
        }

        function showSignUp() {
            alert('Sign up page would be implemented here!');
        }

        // Enhanced floating animation on mouse move
        document.addEventListener('mousemove', function(e) {
            const card = document.querySelector('.signin-card');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                card.style.transform = `perspective(1000px) rotateY(${deltaX * 3}deg) rotateX(${-deltaY * 3}deg) scale(1.02)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            }
        });

        // Add CSS animations for enhanced effects
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            @keyframes successPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);

        // Add pulse animation to signin button after page loads
        setTimeout(() => {
            const btn = document.querySelector('.signin-btn');
            btn.classList.add('pulse-animation');
            
            // Remove pulse after interaction
            btn.addEventListener('mouseenter', function() {
                this.classList.remove('pulse-animation');
            }, { once: true });
        }, 3000);

        // Enhanced input focus effects
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
