const register = () => {
    return `
        <div class="login-page">
            <div class="login-container">
                <div class="clinic-icon">
                    <img src="assets/icons/hospital.png" alt="Clinic Icon" />
                </div>
                <h2>Register</h2>
                <form class="login-form" onsubmit="return handleRegister(event)">
                    <div class="form-group">
                        <input type="text" id="fullName" placeholder="Full Name" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" placeholder="E-mail Address" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="password" placeholder="Password" class="form-input" required>
                    </div>
                    <button type="submit" class="register-btn">Register</button>
                </form>
                
                <div class="switch-form">
                    <p>Already have an account? <a href="./login" onclick="route(event)" class="switch-link">Login here</a></p>
                </div>
            </div>
        </div>
    `;
};


window.handleRegister = function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!fullName || !email || !password) {
        alert('Please fill all fields');
        return false;
    }

    const userData = {
        fullName: fullName,
        email: email,
        password: password
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    alert('Registration successful!');
    

    window.history.pushState({}, "", '/login');
    
    // Call handleLocation if available to update the view
    if (window.handleLocation) {
        window.handleLocation();
    } else {
        const event = new Event('popstate');
        window.dispatchEvent(event);
    }
    
    return false;
};

export default register;