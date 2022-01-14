const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");

const register = document.getElementById("register");
const login = document.getElementById("login");

const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const promo = document.getElementById("promo");
const emailRegister = document.getElementById("emailRegister");
const passwordRegister = document.getElementById("passwordRegister");

let join = false;

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    logger.connexion(email.value, password.value);
});

formRegister.addEventListener("submit", (event) => {
    event.preventDefault();
    logger.inscription(nom.value, prenom.value, promo.value, emailRegister.value, passwordRegister.value);
});

register.addEventListener("click", () => {
    formLogin.style.display = "none";
    formRegister.style.display = "flex";
});

login.addEventListener("click", () => {
    formLogin.style.display = "flex";
    formRegister.style.display = "none";
});
