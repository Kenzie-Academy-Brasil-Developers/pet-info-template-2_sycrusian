import { loadPosts, verifyUser } from "./requests.js";
import { toast, green } from "./toast.js";

const currentUser = {};

const loadUser = userInfo => {
    currentUser.id = userInfo.id;
    currentUser.username = userInfo.username;
    currentUser.email = userInfo.email;
    currentUser.avatar = userInfo.avatar;
}

const toggleLogoutMenu = () => {
    const logoutMenu = document.querySelector("#logout-menu");
    logoutMenu.classList.toggle("logout__menu");
    logoutMenu.classList.toggle("hidden");
}

const logout = () => {
    localStorage.removeItem("@petinfo:token");
    open("./../../index.html", "_self");
}

const renderPage = () => {
    const userAvatar = document.querySelector("#user-avatar");
    userAvatar.src = currentUser.avatar;
    userAvatar.alt = currentUser.username;
    userAvatar.addEventListener("click", () => toggleLogoutMenu());
    const userName = document.querySelector("#user-name");
    userName.innerText = currentUser.username;
    const logoutButton = document.querySelector("#logout-button");
    logoutButton.addEventListener("click", () => logout());
}


const handleAuthentication = async () => {
    const token = localStorage.getItem("@petinfo:token");
    const userInfo = await verifyUser(token);
    if (userInfo) {
        loadUser(userInfo);
        renderPage();
    } else {
        location.replace("./../../index.html");
    }
}

const buildPost = post => {
    const postCard = document.createElement("li");
    postCard.classList.add("post__container");
    const postId = document.createElement("span");
    postId.classList.add("hidden");
    postId.innerText = post.id;
    const postHeader = document.createElement("div");
    postHeader.classList.add("post__header");
    const postUserInfo = document.createElement("div");
    postUserInfo.classList.add("post__userinfo");
    const postAvatar = document.createElement("img");
    postAvatar.classList.add("post__avatar");
    postAvatar.src = post.user.avatar;
    postAvatar.alt = post.user.username;
    const postUserName = document.createElement("h3");
    postUserName.classList.add("title-4");
    postUserName.innerText = post.user.username;
    postUserInfo.append(postAvatar, postUserName);
    const postMenu = document.createElement("div");
    postMenu.classList.add("post__menu");
    const postEditButton = document.createElement("button");
    post.user.id === currentUser.id ?
        postEditButton.classList.add("button", "button__small", "button__white") :
        postEditButton.classList.add("hidden");    
    postEditButton.innerText = "Editar";
    const postDeleteButton = document.createElement("button");
    post.user.id === currentUser.id ?
        postDeleteButton.classList.add("button", "button__small", "button__white") :
        postDeleteButton.classList.add("hidden");
    postDeleteButton.innerText = "Excluir";
        postMenu.append(postEditButton, postDeleteButton);
    postHeader.append(postUserInfo, postMenu);
    const postTitle = document.createElement("h2");
    postTitle.classList.add("title-2", "bolder");
    postTitle.innerText = post.title;
    const postContent = document.createElement("p");
    postContent.classList.add("text-1", "post__text");
    postContent.innerText = post.content;
    const postAccess = document.createElement("a");
    postAccess.classList.add("text-3", "post__access");
    postAccess.innerText = "Acessar publicação";
    postCard.append(postId, postHeader, postTitle, postContent, postAccess);
    return postCard;
}


const getPosts = async () => {
    const token = localStorage.getItem("@petinfo:token");
    const postInfo = await loadPosts(token);
    if (postInfo) {
        const postList = document.querySelector("#feed-list");
        postInfo.forEach(post => {
            postList.appendChild(buildPost(post));
        });
    }
}




const openPage = () => {
    handleAuthentication();
    getPosts();
}

openPage();