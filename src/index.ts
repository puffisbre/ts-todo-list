const addPostBtn = document.querySelector('.add-post-btn') as HTMLButtonElement;
const postParent = document.querySelector('.post-parent') as HTMLElement;
const postTitle = document.querySelector('.post-title') as HTMLElement;
const postContent = document.querySelector('.post-content') as HTMLElement;
const postComplete = document.querySelector('.post-complete') as HTMLElement;
const allLiItems = document.getElementsByClassName('post-item') as HTMLCollection;

 

let id: number = 0;



postParent.innerHTML = '';

type Post = {
    id: number,
    title: string,
    content: string,
    completed: boolean
}

let allPosts: Post[] = [];

if (localStorage.getItem("postList") != null) {
     allPosts = JSON.parse(localStorage.getItem("postList"));

}else{
     allPosts = [];
}


const addPost = (a: Post[]) => {
const inputTitle = (document.querySelector('#title-to-add') as HTMLInputElement).value;
const inputContent = (document.querySelector('#task-to-add') as HTMLInputElement).value;
if (localStorage.getItem("postList") != null) {
   id = Date.now();
}
    const singlePost: Post = {
        id: 0,
        title: "",
        content: "",
        completed: false
    }

    singlePost.id = id;
    singlePost.title = inputTitle;
    singlePost.content = inputContent;
    singlePost.completed = false;
    a.push(singlePost)
   return a;
}

const localStorageGet: Post[] = JSON.parse(localStorage.getItem("postList"));

const del = (e) => {
    let freshArray: Post[] = [...JSON.parse(localStorage.getItem("postList"))];
    freshArray = freshArray.filter(item => item.id !== parseInt(e.parentNode.parentNode.id));
    allPosts = allPosts.filter(item => item.id !== parseInt(e.parentNode.parentNode.id));
    postParent.innerHTML = '';
    localStorage.setItem('postList', JSON.stringify(freshArray));
    renderUI(JSON.parse(localStorage.getItem("postList")));
    setTimeout(() => {
        checkAllTask();
    }, 100);
}

const checkAllTask = () => {
    JSON.parse(localStorage.getItem("postList")).map((item) => {
        for(let i = 0; i < allLiItems.length; i++){
            if(item.id === parseInt(allLiItems[i].id)){
                if(item.completed === true){
                    allLiItems[i].classList.add("completeTask");
                }else if(item.completed === false){
                    allLiItems[i].classList.remove("completeTask");
                }
            }
        }
    });
}
setTimeout(() => {
    checkAllTask();
}, 100);


const completeTask = (e) => {
let freshArray: Post[] = [...JSON.parse(localStorage.getItem("postList"))];
let targetedItem: Post[] = freshArray.filter(item => item.id === parseInt(e.parentNode.parentNode.id));
let targetedLocalItem = allPosts.filter(item => item.id === parseInt(e.parentNode.parentNode.id));
targetedItem.map((item) => {
   item.completed = !item.completed;
   if(item.completed === true){
    e.parentNode.parentNode.classList.add("completeTask");
   }else if(item.completed === false){
    e.parentNode.parentNode.classList.remove("completeTask");
   }
});
targetedLocalItem.map((item) => {
    item.completed = !item.completed;
})
localStorage.setItem('postList', JSON.stringify(freshArray));
}
let open: boolean = false;
const editTask = (e) => {
    const copyArray: Post[] = [...JSON.parse(localStorage.getItem("postList"))];
    const editTaskInput = document.createElement('input') as HTMLInputElement;
    const editTitleInput = document.createElement('input') as HTMLInputElement;
    const saveEditBtn = document.createElement('button') as HTMLButtonElement
    

    if(open === false){
        open = true;
        saveEditBtn.innerText = "Save Edit";

        copyArray.map((item) => {
            if(item.id === parseInt(e.parentNode.parentNode.id)){
                 editTaskInput.value = item.content;
                 editTitleInput.value = item.title;
                  }
        })
    
        saveEditBtn.addEventListener(('click'), () => {
            copyArray.map((item) => {
                if(item.id === parseInt(e.parentNode.parentNode.id)){
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
        })
        e.parentNode.parentNode.appendChild(editTitleInput);
        e.parentNode.parentNode.appendChild(editTaskInput);
        e.parentNode.parentNode.appendChild(saveEditBtn);
    }else if(open === true){ 
         open = false;
         postParent.innerHTML = '';
        renderUI(JSON.parse(localStorage.getItem("postList")));
        setTimeout(() => {
            checkAllTask();
        }, 100);
    }
   
}

const renderUI = (a: Post[]) => {
 a.map((item) => {
   const li = `<li class="post-item" id=${item.id}>
    <h3 class="post-title">Title: ${item.title}</h3>
    <p class="post-content">Task: ${item.content}</p>
    <div class="button-wrapper">
    <button class="post-complete" onclick="completeTask(this)"><img src=".././images/icons/check.png" width="20px"></button>
    <button class="post-edit" onclick="editTask(this)"><img src=".././images/icons/pencil.png" width="20px"></button>
    <button class="post-delete" onclick="del(this)"><img src=".././images/icons/bin.png" width="20px"></button>
    </div>
    </li>`;
    postParent.innerHTML += li;
 })
}

addPostBtn.addEventListener('click', () => {
    postParent.innerHTML = '';
localStorage.setItem('postList', JSON.stringify(addPost(allPosts)));
renderUI(JSON.parse(localStorage.getItem("postList")));
setTimeout(() => {
    checkAllTask();
}, 100);
})

if (localStorage.getItem("postList") != null) {
    renderUI(JSON.parse(localStorage.getItem("postList")));
}

export {};
