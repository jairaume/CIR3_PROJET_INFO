const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');
const email = document.getElementById('emailLogin')
const password = document.getElementById("passwordLogin")

let join = false;

formLogin.addEventListener('submit', (event) => {
    console.log('Connection');
    event.preventDefault();
    logger.connexion(email.value, password.value);
});
