const login = () => {  
    return `
        <div class="login-page">
            <div class="login-container">
                <div class="clinic-icon">
                    <img src="assets/icons/hospital.png" alt="Clinic Icon" />
                </div>
                <h2>Login</h2>
                <form class="login-form">
                    <div class="form-group">
                        <input type="email" placeholder="E-mail Address" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Password" class="form-input" required>
                    </div>
                    <button type="submit" class="register-btn">Register</button>
                </form>
            </div>
        </div>
    `;
};
export default login;