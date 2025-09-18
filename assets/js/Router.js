import nav from "../js/components/nav.js";
import dashboard from "./components/dashboard.js";
import patient from "./components/patien.js";
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

const handleLocation = () => {
    const path = window.location.pathname;
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
}

document.addEventListener("DOMContentLoaded", () => {
    handleLocation();
});

window.addEventListener("popstate", handleLocation);