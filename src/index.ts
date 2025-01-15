const addPostBtn = document.querySelector('.add-post-btn') as HTMLButtonElement;
const postParent = document.querySelector('.post-parent') as HTMLElement;
const postTitle = document.querySelector('.post-title') as HTMLElement;
const postContent = document.querySelector('.post-content') as HTMLElement;
const postComplete = document.querySelector('.post-complete') as HTMLElement;

let id: number = JSON.parse(localStorage.getItem("postList"))[JSON.parse(localStorage.getItem("postList")).length - 1].id;
postParent.innerHTML = '';

type Post = {
    id: number,
    title: string,
    content: string,
    completed: boolean
}

let allPosts: Post[] = JSON.parse(localStorage.getItem("postList"));

const addPost = (a: Post[]) => {
const inputTitle = (document.querySelector('#title-to-add') as HTMLInputElement).value;
const inputContent = (document.querySelector('#task-to-add') as HTMLInputElement).value;
    id++;
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

const renderUI = (a: Post[]) => {
 a.map((item) => {
   const li = `<li id=${id}>
    <h1 class="post-title">${item.title}</h1>
    <p class="post-content">${item.content}</p>
    <h4 class="post-complete">${item.completed.toString()}</h4>
    <button class="post-delete" onclick=${deletePost(JSON.parse(localStorage.getItem("postList")))}>Delete Post</button>
    </li>`;
    postParent.innerHTML += li;
 })
}

//Ta in array från localstorage och sen stoppa i den igen.

const deletePost = (a: Post[]) => {
 a.splice(a.findIndex(i => {
    return i.id === 1;
 }), 1)
}

addPostBtn.addEventListener('click', () => {
    postParent.innerHTML = '';
localStorage.setItem('postList', JSON.stringify(addPost(allPosts)));
renderUI(JSON.parse(localStorage.getItem("postList")));
})

renderUI(JSON.parse(localStorage.getItem("postList")));
