import { login, verifyUser } from "./requests.js";
import { toast, red } from "./toast.js";

const handleAuthentication = async () => {
    const token = localStorage.getItem("@petinfo:token");
    const loggedIn = await verifyUser(token);
    if (loggedIn) {
        location.replace("./src/pages/feed.html");
    }
}

const handleAlert = alertMessage => {
    if (alertMessage.includes("email")) {
        document.querySelector("#email-alert").classList.remove("login__alert--hidden");
    }
    if (alertMessage.includes("senha")) {
        document.querySelector("#password-alert").classList.remove("login__alert--hidden");
    }
}

const handleLogin = () => {
    const loginInputs = document.querySelectorAll(".login__input");
    const emailAlert = document.querySelector("#email-alert");
    const passwordAlert = document.querySelector("#password-alert");
    const loginButton = document.querySelector("#login-button");
    loginButton.addEventListener("click", async () => {
        emailAlert.classList.add("login__alert--hidden");
        passwordAlert.classList.add("login__alert--hidden");
        const loginBody = {};
        let counter = 0;
        loginInputs.forEach(input => {
            input.value.trim() ? loginBody[input.name] = input.value.trim() : counter++;
        })
        if (counter > 0) {
            toast("Por favor, preencha todos os campos.", red);
        }
        else {
            const loginResult = await login(loginBody);
            if (loginResult.includes("incorret")) {
                handleAlert(loginResult);
            } else {
                localStorage.setItem("@petinfo:token", loginResult);
                open("./src/pages/feed.html", "_self");
            }
        }
    });
}

const handleRegister = () => {
    const registerButton = document.querySelector("#register-button");
    registerButton.addEventListener("click", () => open("./src/pages/register.html", "_self"));
}

const openPage = () => {
    handleAuthentication();
    handleLogin();
    handleRegister();
}


openPage();
