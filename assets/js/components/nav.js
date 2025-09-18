const nav = () => {
    return `
      <nav>
        <a href="/" onclick="route(event)">Dashboard</a>
        <a href="/patient" onclick="route(event)">Patients</a>
        <a href="/appointment" onclick="route(event)">Appointments</a>
        <a href="/recette" onclick="route(event)">Recette</a>
        <a href="/login" onclick="route(event)">Login</a>
        <a href="/register" onclick="route(event)">Register</a>
      </nav>
    `;
};
export default nav;