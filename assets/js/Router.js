import nav from "../js/components/nav.js";
import dashboard from "./components/dashboard.js";
import patient, { initPatientModal } from "./components/patien.js";
import appointments from "./components/apoinments.js";
import login from "./components/login.js";
import register from "./components/register.js";
import recette from "./components/recette.js";  



const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

window.route = route;
const routes = {
    "/": dashboard(),
    "/patient": patient(),
    "/appointment": appointments(),
    "/login": login(),
    "/register": register(),
    "/recette": recette(),
    404 : `<h1>404</h1><p>Page not found.</p>`
};

// Simple authentication check function
const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

// Check if user should be redirected to login
const checkAuth = (path) => {
    const publicPages = ['/login', '/register'];
    const isPublicPage = publicPages.includes(path);
    const userIsAuthenticated = isAuthenticated();
    
    // If user is not authenticated and trying to access private page
    if (!userIsAuthenticated && !isPublicPage) {
        window.history.pushState({}, "", '/login');
        return '/login';
    }
    
    // If user is authenticated and trying to access login/register
    if (userIsAuthenticated && isPublicPage) {
        window.history.pushState({}, "", '/');
        return '/';
    }
    
    return path;
};

const handleLocation = () => {
    let path = window.location.pathname;
    path = '/' + path.split('\/')[path.split('\/').length -1];
    // Check authentication and get the correct path
    path = checkAuth(path);
    
    const pageContent = routes[path] || routes[404];
    
    // Don't show navigation on login and register pages
    if (path === '/login' || path === '/register') {
        document.getElementById("root").innerHTML = pageContent;
    } else {
        document.getElementById("root").innerHTML = `
            ${nav()}
            <div id="page-content">${pageContent}</div>
        `;
    }

    if (path === '/patient') {
        initPatientModal();
    }
}

// Make handleLocation globally accessible
window.handleLocation = handleLocation;

document.addEventListener("DOMContentLoaded", () => {
    handleLocation();
});

window.addEventListener("popstate", handleLocation);