const baseUrl = "http://localhost:3333/"

export const login = async loginBody => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginBody)
    };
    const postLogin = fetch(`${baseUrl}login`, options)
        .then(async response => {
            const result = await response.json();
            return response.ok ? result.token : result.message;
        });
    return postLogin;
}

export const registerUser = async registerBody => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerBody)
    };
    const postRegister = fetch(`${baseUrl}users/create`, options)
        .then(response => {
            return response.ok;
        });
    return postRegister;
}

export const verifyUser = async token => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    const getUser = fetch(`${baseUrl}users/profile`, options)
        .then(async response => {
            const result = await response.json();
            return response.ok ? result : false;
        });
    return getUser;
}

export const loadPosts = async token => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    const getPosts = fetch(`${baseUrl}posts`, options)
        .then(async response => {
            const result = await response.json();
            return response.ok ? result : false;
        });
    return getPosts;
}