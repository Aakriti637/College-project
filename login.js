// Generate random captcha
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Store current captcha
let currentCaptcha = generateCaptcha();
document.getElementById('captchaText').textContent = currentCaptcha;

// Refresh captcha button
document.getElementById('refreshCaptcha').addEventListener('click', function() {
    currentCaptcha = generateCaptcha();
    document.getElementById('captchaText').textContent = currentCaptcha;
    document.getElementById('captchaInput').value = '';
});

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 3000);
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;
    const robotCheck = document.getElementById('robotCheck').checked;
    
    // Validate inputs
    if (!username || !password) {
        showError('Please enter username and password');
        return;
    }
    
    if (!robotCheck) {
        showError('Please confirm you are not a robot');
        return;
    }
    
    if (captchaInput !== currentCaptcha) {
        showError('Incorrect captcha. Please try again.');
        currentCaptcha = generateCaptcha();
        document.getElementById('captchaText').textContent = currentCaptcha;
        document.getElementById('captchaInput').value = '';
        return;
    }
    
    // Demo credentials (in real app, this would validate against backend)
    if (username === 'admin' && password === 'admin123') {
        // Store login status
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        showError('Invalid username or password');
    }
});

// Add input animations
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});