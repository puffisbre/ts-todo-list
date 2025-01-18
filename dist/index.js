const addPostBtn = document.querySelector('.add-post-btn');
const postParent = document.querySelector('.post-parent');
const postTitle = document.querySelector('.post-title');
const postContent = document.querySelector('.post-content');
const postComplete = document.querySelector('.post-complete');
const allLiItems = document.getElementsByClassName('post-item');
let id = 0;
postParent.innerHTML = '';
let allPosts = [];
if (localStorage.getItem("postList") != null) {
    allPosts = JSON.parse(localStorage.getItem("postList"));
}
else {
    allPosts = [];
}
const addPost = (a) => {
    const inputTitle = document.querySelector('#title-to-add').value;
    const inputContent = document.querySelector('#task-to-add').value;
    if (localStorage.getItem("postList") != null) {
        id = Date.now();
    }
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
const localStorageGet = JSON.parse(localStorage.getItem("postList"));
const del = (e) => {
    let freshArray = [...JSON.parse(localStorage.getItem("postList"))];
    freshArray = freshArray.filter(item => item.id !== parseInt(e.parentNode.id));
    allPosts = allPosts.filter(item => item.id !== parseInt(e.parentNode.id));
    postParent.innerHTML = '';
    localStorage.setItem('postList', JSON.stringify(freshArray));
    renderUI(JSON.parse(localStorage.getItem("postList")));
    setTimeout(() => {
        checkAllTask();
    }, 100);
};
/* localStorageGet.map((item) => {
    if(item.completed === true){
        for(let i = 0; i < allLiItems.length; i++){
            allLiItems[i].classList.add("completeTask");
        }
    }else if(item.completed === false){
        for(let i = 0; i < allLiItems.length; i++){
            allLiItems[i].classList.remove("completeTask");
        }
    }
}) */
const checkAllTask = () => {
    JSON.parse(localStorage.getItem("postList")).map((item) => {
        for (let i = 0; i < allLiItems.length; i++) {
            if (item.id === parseInt(allLiItems[i].id)) {
                if (item.completed === true) {
                    allLiItems[i].classList.add("completeTask");
                }
                else if (item.completed === false) {
                    allLiItems[i].classList.remove("completeTask");
                }
            }
        }
    });
};
setTimeout(() => {
    checkAllTask();
}, 100);
const completeTask = (e) => {
    let freshArray = [...JSON.parse(localStorage.getItem("postList"))];
    let targetedItem = freshArray.filter(item => item.id === parseInt(e.parentNode.id));
    let targetedLocalItem = allPosts.filter(item => item.id === parseInt(e.parentNode.id));
    targetedItem.map((item) => {
        item.completed = !item.completed;
        if (item.completed === true) {
            e.parentNode.classList.add("completeTask");
        }
        else if (item.completed === false) {
            e.parentNode.classList.remove("completeTask");
        }
    });
    targetedLocalItem.map((item) => {
        item.completed = !item.completed;
    });
    localStorage.setItem('postList', JSON.stringify(freshArray));
};
const renderUI = (a) => {
    a.map((item) => {
        const li = `<li class="post-item" id=${item.id}>
    <h1 class="post-title">${item.title}</h1>
    <p class="post-content">${item.content}</p>
    <h4 class="post-complete">${item.completed.toString()}</h4>
    <button class="post-delete" onclick="del(this)">Delete Post</button>
    <button class="post-complete" onclick="completeTask(this)">Complete Post</button>
    </li>`;
        postParent.innerHTML += li;
    });
};
addPostBtn.addEventListener('click', () => {
    postParent.innerHTML = '';
    localStorage.setItem('postList', JSON.stringify(addPost(allPosts)));
    renderUI(JSON.parse(localStorage.getItem("postList")));
    setTimeout(() => {
        checkAllTask();
    }, 100);
});
if (localStorage.getItem("postList") != null) {
    renderUI(JSON.parse(localStorage.getItem("postList")));
}
//# sourceMappingURL=index.js.map