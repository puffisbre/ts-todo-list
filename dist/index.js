const addPostBtn = document.querySelector('.add-post-btn');
const postParent = document.querySelector('.post-parent');
const postTitle = document.querySelector('.post-title');
const postContent = document.querySelector('.post-content');
const postComplete = document.querySelector('.post-complete');
let id = JSON.parse(localStorage.getItem("postList"))[JSON.parse(localStorage.getItem("postList")).length - 1].id;
postParent.innerHTML = '';
let allPosts = JSON.parse(localStorage.getItem("postList"));
const addPost = (a) => {
    const inputTitle = document.querySelector('#title-to-add').value;
    const inputContent = document.querySelector('#task-to-add').value;
    id++;
    const singlePost = {
        id: 0,
        title: "",
        content: "",
        completed: false
    };
    singlePost.id = id;
    singlePost.title = inputTitle;
    singlePost.content = inputContent;
    singlePost.completed = false;
    a.push(singlePost);
    return a;
};
const renderUI = (a) => {
    a.map((item) => {
        const li = `<li id=${id}>
    <h1 class="post-title">${item.title}</h1>
    <p class="post-content">${item.content}</p>
    <h4 class="post-complete">${item.completed.toString()}</h4>
    <button class="post-delete" onclick=${deletePost(JSON.parse(localStorage.getItem("postList")))}>Delete Post</button>
    </li>`;
        postParent.innerHTML += li;
    });
};
const deletePost = (a) => {
    a.splice(a.findIndex(i => {
        return i.id === 1;
    }), 1);
};
addPostBtn.addEventListener('click', () => {
    postParent.innerHTML = '';
    localStorage.setItem('postList', JSON.stringify(addPost(allPosts)));
    renderUI(JSON.parse(localStorage.getItem("postList")));
});
renderUI(JSON.parse(localStorage.getItem("postList")));
//# sourceMappingURL=index.js.map