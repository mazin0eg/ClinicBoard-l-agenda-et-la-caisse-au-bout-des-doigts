const login = () => {  
    return `
        <div class="login-page">
            <div class="login-container">
                <div class="clinic-icon">
                    <img src="assets/icons/hospital.png" alt="Clinic Icon" />
                </div>
                <h2>Login</h2>
                <form class="login-form" onsubmit="return handleLogin(event)">
                    <div class="form-group">
                        <input type="email" id="loginEmail" placeholder="E-mail Address" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="loginPassword" placeholder="Password" class="form-input" required>
                    </div>
                    <button type="submit" class="register-btn">Login</button>
                </form>
                
                <div class="switch-form">
                    <p>Don't have an account? <a href="./register" onclick="route(event)" class="switch-link">Register here</a></p>
                </div>
            </div>
        </div>
    `;
};


window.handleLogin = function(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please fill all fields');
        return false;
    }
    
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
   
    if (userData.email === email && userData.password === password) {
      
        localStorage.setItem('isLoggedIn', 'true');
        
       
        window.history.pushState({}, "", './');
        
        if (window.handleLocation) {
            window.handleLocation();
        } else {
            const event = new Event('popstate');
            window.dispatchEvent(event);
        }
    } else {
        alert('Invalid email or password');
    }
    
    return false;
};

export default login;