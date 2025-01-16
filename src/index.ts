const addPostBtn = document.querySelector('.add-post-btn') as HTMLButtonElement;
const postParent = document.querySelector('.post-parent') as HTMLElement;
const postTitle = document.querySelector('.post-title') as HTMLElement;
const postContent = document.querySelector('.post-content') as HTMLElement;
const postComplete = document.querySelector('.post-complete') as HTMLElement;

let id: number = 0;

if (localStorage.getItem("postList") != null) {
   id = JSON.parse(localStorage.getItem("postList"))[JSON.parse(localStorage.getItem("postList")).length - 1].id;

}else{
   id = 0;
}


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
    id++;
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

const localStorageGet: [] = JSON.parse(localStorage.getItem("postList"));

const renderUI = (a: Post[]) => {
 a.map((item) => {
   const li = `<li id=${item.id}>
    <h1 class="post-title">${item.title}</h1>
    <p class="post-content">${item.content}</p>
    <h4 class="post-complete">${item.completed.toString()}</h4>
    <button class="post-delete">Delete Post</button>
    </li>`;
    postParent.innerHTML += li;
 })
}

//Ta in array från localstorage och sen stoppa i den igen.

document.addEventListener('click', (evt) => {
    let freshArray: Post[] = [...localStorageGet];
    const { target } = evt;
    if (target instanceof HTMLElement) {
      // freshArray = freshArray.filter(a => a.id != parseInt(target.parentElement.id));
      const index = freshArray.findIndex(item => item.id === parseInt(target.parentElement.id));

 //if (index !== -1) {
         //   freshArray.splice(index, 1);
       // }
       console.log(index);

console.log(freshArray);
    }
});




addPostBtn.addEventListener('click', () => {
    postParent.innerHTML = '';
localStorage.setItem('postList', JSON.stringify(addPost(allPosts)));
renderUI(JSON.parse(localStorage.getItem("postList")));
})

if (localStorage.getItem("postList") != null) {
    renderUI(JSON.parse(localStorage.getItem("postList")));
}



  

export {};
