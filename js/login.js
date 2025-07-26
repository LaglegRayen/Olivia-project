// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
<<<<<<< HEAD
    const googleLoginBtn = document.querySelector('.btn-google');
    
=======
>>>>>>> master
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
<<<<<<< HEAD
    
    // Handle Google login
    googleLoginBtn.addEventListener('click', handleGoogleLogin);
    
    // Add enter key support
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
=======
>>>>>>> master
});

function handleLogin() {
    const email = document.getElementById('email').value;
<<<<<<< HEAD
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showError('Veuillez remplir tous les champs');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    submitBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // For demo purposes, accept any email/password
        if (email && password) {
            // Store user session
            localStorage.setItem('user', JSON.stringify({
                email: email,
                loginTime: new Date().toISOString()
            }));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError('Email ou mot de passe incorrect');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1000);
}

function handleGoogleLogin() {
    // Show loading state
    const googleBtn = document.querySelector('.btn-google');
    const originalText = googleBtn.innerHTML;
    googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    googleBtn.disabled = true;
    
    // Simulate Google login process
    setTimeout(() => {
        // For demo purposes, simulate successful Google login
        localStorage.setItem('user', JSON.stringify({
            email: 'user@gmail.com',
            loginTime: new Date().toISOString(),
            provider: 'google'
        }));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 1500);
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background-color: #ffebee;
        color: #c62828;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #ef9a9a;
        text-align: center;
    `;
    errorDiv.textContent = message;
    
    // Insert error message before the form
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
=======
    // Basic validation
    if (!email) {
        showError('Veuillez entrer votre email');
        return;
    }
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Connexion...';
    submitBtn.disabled = true;
    // Simulate login process
    setTimeout(() => {
        // For demo purposes, accept any email
        localStorage.setItem('user', JSON.stringify({
            email: email,
            loginTime: new Date().toISOString()
        }));
        // Redirect to dashboard
        window.location.href = '../html/dashboard.html';
    }, 800);
}


function showError(message) {
    // Show error in the dedicated error div
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        setTimeout(() => {
            errorDiv.textContent = '';
        }, 4000);
    }
>>>>>>> master
}
