const addPostBtn = document.querySelector('.add-post-btn');
const postParent = document.querySelector('.post-parent');
const postTitle = document.querySelector('.post-title');
const postContent = document.querySelector('.post-content');
const postComplete = document.querySelector('.post-complete');
const allLiItems = document.getElementsByClassName('post-item');
const titleInput = document.querySelector('#title-to-add');
const textInput = document.querySelector('#task-to-add');
let id = 0;
postParent.innerHTML = '';
let allPosts = [];
titleInput.value = "";
textInput.value = "";
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
    freshArray = freshArray.filter(item => item.id !== parseInt(e.parentNode.parentNode.id));
    allPosts = allPosts.filter(item => item.id !== parseInt(e.parentNode.parentNode.id));
    postParent.innerHTML = '';
    localStorage.setItem('postList', JSON.stringify(freshArray));
    renderUI(JSON.parse(localStorage.getItem("postList")));
    setTimeout(() => {
        checkAllTask();
    }, 100);
};
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
    let targetedItem = freshArray.filter(item => item.id === parseInt(e.parentNode.parentNode.id));
    let targetedLocalItem = allPosts.filter(item => item.id === parseInt(e.parentNode.parentNode.id));
    targetedItem.map((item) => {
        item.completed = !item.completed;
        if (item.completed === true) {
            e.parentNode.parentNode.classList.add("completeTask");
        }
        else if (item.completed === false) {
            e.parentNode.parentNode.classList.remove("completeTask");
        }
    });
    targetedLocalItem.map((item) => {
        item.completed = !item.completed;
    });
    localStorage.setItem('postList', JSON.stringify(freshArray));
};
let open = false;
const editTask = (e) => {
    const copyArray = [...JSON.parse(localStorage.getItem("postList"))];
    const editTaskInput = document.createElement('input');
    const editTitleInput = document.createElement('input');
    const saveEditBtn = document.createElement('button');
    if (open === false) {
        open = true;
        saveEditBtn.innerText = "Save Edit";
        copyArray.map((item) => {
            if (item.id === parseInt(e.parentNode.parentNode.id)) {
                editTaskInput.value = item.content;
                editTitleInput.value = item.title;
            }
        });
        saveEditBtn.addEventListener(('click'), () => {
            copyArray.map((item) => {
                if (item.id === parseInt(e.parentNode.parentNode.id)) {
                    item.content = editTaskInput.value;
                    item.title = editTitleInput.value;
                }
            });
            postParent.innerHTML = '';
            localStorage.setItem('postList', JSON.stringify(copyArray));
            renderUI(JSON.parse(localStorage.getItem("postList")));
            setTimeout(() => {
                checkAllTask();
            }, 100);
            open = false;
        });
        e.parentNode.parentNode.appendChild(editTitleInput);
        e.parentNode.parentNode.appendChild(editTaskInput);
        e.parentNode.parentNode.appendChild(saveEditBtn);
    }
    else if (open === true) {
        open = false;
        postParent.innerHTML = '';
        renderUI(JSON.parse(localStorage.getItem("postList")));
        setTimeout(() => {
            checkAllTask();
        }, 100);
    }
};
const renderUI = (a) => {
    a.map((item) => {
        const li = `<li class="post-item" id=${item.id}>
    <h3 class="post-title">Title: ${item.title}</h3>
    <p class="post-content">Task: ${item.content}</p>
    <div class="button-wrapper">
    <button class="post-complete" onclick="completeTask(this)"><img class="post-complete-btn" src=".././images/icons/check.png" width="25px"></button>
    <button class="post-edit" onclick="editTask(this)"><img class="post-edit-btn" src=".././images/icons/pencil.png" width="20px"></button>
    <button class="post-delete" onclick="del(this)"><img class="post-delete-btn" src=".././images/icons/bin.png" width="20px"></button>
    </div>
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
    titleInput.value = "";
    textInput.value = "";
});
if (localStorage.getItem("postList") != null) {
    renderUI(JSON.parse(localStorage.getItem("postList")));
}
//# sourceMappingURL=index.js.map