import { createPost, loadPost, loadPosts, verifyUser } from "./requests.js";
import { toast, green, red } from "./toast.js";

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

const displayPost = async id => {
    const token = localStorage.getItem("@petinfo:token");
    const post = await loadPost(token, id);
    if (post) {
        const displayPostDialog = document.querySelector("#view-post");
        const displayPostId = document.querySelector("#view-post-id");
        displayPostId.innerText = post.id;
        const displayPostAvatar = document.querySelector("#view-post-avatar");
        displayPostAvatar.src = post.user.avatar;
        displayPostAvatar.alt = post.user.username;
        const displayPostName = document.querySelector("#view-post-name");
        displayPostName.innerText = post.user.username;
        const displayPostDate = document.querySelector("#view-post-date");
        displayPostDate.innerText = Date(post.createdAt);
        const displayPostTitle = document.querySelector("#view-post-title");
        displayPostTitle.innerText = post.title;
        const displayPostContent = document.querySelector("#view-post-content");
        displayPostContent.innerText = post.content;
        const displayPostClose = document.querySelector("#view-post-close");
        displayPostClose.addEventListener("click", () => displayPostDialog.close());
        displayPostDialog.showModal();
    } else {
        const message = "Erro ao tentar abrir publicação. Por favor, tente novamente mais tarde";
        toast(message, red);
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
    postAccess.addEventListener("click", event => {
        const id = event.currentTarget.parentNode.querySelector("span").innerText;
        displayPost(id);
    })
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

const handleNewPost = () => {
    const newPostDialog = document.querySelector("#create-post");
    const newPostInputs = document.querySelectorAll(".new-post__input");
    
    const newPostButton = document.querySelector("#new-post");
    newPostButton.addEventListener("click", () => {
        newPostInputs.forEach(input => input.value = "");
        newPostDialog.showModal();
    });
    
    const newPostClose = document.querySelector("#create-post-close");
    newPostClose.addEventListener("click", () => newPostDialog.close());
    
    const newPostCancel = document.querySelector("#create-post-cancel");
    newPostCancel.addEventListener("click", () => newPostDialog.close());

    const newPostPublish = document.querySelector("#create-post-publish");
    newPostPublish.addEventListener("click", async () => {
        const token = localStorage.getItem("@petinfo:token");
        const post = {};
        let counter = 0;
        newPostInputs.forEach(input => {
            input.value.trim() ? post[input.name] = input.value.trim() : counter++;
        })
        if (counter > 0) {
            toast("Por favor, preencha todos os campos.", red);
        } else {
            const postResult = await createPost(token, post);
            if (postResult) {
                toast("Publicação realizada com sucesso!", green);
                getPosts();
                newPostDialog.close();
            } else {
                const message = "Erro ao realizar publicação. Por favor, tente novamente mais tarde.";
                toast(message, red);
            }
        }
    })

}








const openPage = () => {
    handleAuthentication();
    getPosts();
    handleNewPost();
}

openPage();