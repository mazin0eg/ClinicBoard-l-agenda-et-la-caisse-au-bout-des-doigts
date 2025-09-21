const nav = () => {
    return `
      <nav class="sidebar">
        <div class="sidebar-header">
          <div class="clinic-icon">
            <img src="assets/icons/hospital.png" alt="Clinic Icon" />
          </div>
          <h3>ClinicBoard</h3>
        </div>
        
        <div class="nav-links">
          <a href="./" onclick="route(event)" class="nav-link">
            <span>📊</span> Dashboard
          </a>
          <a href="./patient" onclick="route(event)" class="nav-link">
            <span>👥</span> Patients
          </a>
          <a href="./appointment" onclick="route(event)" class="nav-link">
            <span>📅</span> Appointments
          </a>
          <a href="./recette" onclick="route(event)" class="nav-link">
            <span>💰</span> Recette
          </a>
        </div>
        
        <div class="sidebar-footer">
          <button onclick="handleLogout()" class="logout-btn">
            <span>🚪</span> Logout
          </button>
        </div>
      </nav>
    `;
};

window.handleLogout = function() {
    localStorage.setItem('isLoggedIn', 'false');
    alert('Logged out successfully!');
    
  
    window.history.pushState({}, "", './login');
    window.handleLocation();
};
export default nav;