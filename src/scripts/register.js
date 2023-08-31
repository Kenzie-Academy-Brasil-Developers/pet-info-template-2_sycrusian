import { registerUser } from "./requests.js";
import { toast, green, red } from "./toast.js";

const handleRegister = () => {
    const registerInputs = document.querySelectorAll(".register__input");
    const registerButton = document.querySelector("#register-button");

    registerButton.addEventListener("click", async () => {
        const registerBody = {};
        let counter = 0;
        registerInputs.forEach(input => {
            input.value.trim() ? registerBody[input.name] = input.value.trim() : counter++;
        })
        if (counter > 0) {
            toast("Por favor, preencha todos os campos.", red);
        } else {
            const registerResult = await registerUser(registerBody);
            if (registerResult) {
                const message = 
                    `Sua conta foi criada com sucesso!
                    
                    Agora você poce acessar os conteúdos utilizando seu usuário e senha na página de login.
                    Redirecionando para a página de login...`;
                toast(message, green);
                setTimeout(() => open("./../../index.html", "_self"), 3000);
            } else {
                const message = "Erro ao criar cadastro. Por favor, tente novamente mais tarde.";
                toast(message, red);
            }
        }
    });
}

const handleReturn = () => {
    const returnButton = document.querySelector("#return-button");
    returnButton.addEventListener("click", () => open("./../../index.html", "_self"));
}

const openPage = () => {
    handleRegister();
    handleReturn();
}

openPage();