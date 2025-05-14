const pageTitle = document.getElementById("page-title");
const btnChangeTitle = document.getElementById("change-title");
const btnGetPosts = document.getElementById("get-posts");
const postsList = document.getElementById("posts-list");
const btnGetPost = document.getElementById("get-post");
const formGetPost = document.getElementById("form-get-post");
const formFindPost = document.getElementById("form-find-post");
const btnSubmitGetForm = document.getElementById("btn-form-get");
const btnSubmitFindForm = document.getElementById("btn-form-find");
const idFormField = document.getElementById("id");
const btnFindPost = document.getElementById("find-post");

const getPosts = () => {
  formGetPost.classList.add("d-none");
  formFindPost.classList.add("d-none");
  postsList.classList.remove("d-none");
  const url = "http://127.0.0.1:3000/posts";
  axios.get(url).then((res) => {
    console.log(res.data.data);
    const listItems = createlistItems(res.data.data);
    postsList.innerHTML = listItems;
  });
};

const changeTitle = () => {
  const url = "http://127.0.0.1:3000";
  axios.get(url).then((res) => {
    pageTitle.innerText = res.data;
    console.log(res);
  });
};

const createlistItems = (posts) => {
  let postsList = "";
  posts.forEach((post) => {
    postsList += renderListItem(post);
  });
  return postsList;
};

const renderListItem = (post) => {
  return `
    <div class="col-12 col-md-6 col-lg-4>
      <div class="card">
    <img src="${post.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">S${post.content}</p>
      <div class="tags">${post.tags}</div>
    </div>
  </div>
  </div>`;
};

const messageError = (status) => {
  return `
    <div> 
    <h1>Status Error ${status}</h1>
    </div>
    `;
};

const showFormPost = () => {
  postsList.classList.add("d-none");
  formFindPost.classList.add("d-none");
  formGetPost.classList.remove("d-none");
};

const getPost = () => {
  const idForm = idFormField.value;
  const url = `http://127.0.0.1:3000/posts/${idForm}`;
  axios
    .get(url)
    .then((res) => {
      console.log(res.status);
      const post = renderListItem(res.data.data);
      postsList.innerHTML = post;
      postsList.classList.remove("d-none");
    })
    .catch((err) => {
      console.log(err.status);
      const error = messageError(err.status);
      postsList.innerHTML = error;
      postsList.classList.remove("d-none");
    });
};

const findPost = () => {
  postsList.classList.add("d-none");
  formGetPost.classList.add("d-none");
  formFindPost.classList.remove("d-none");
};

btnGetPosts.addEventListener("click", getPosts);
btnGetPost.addEventListener("click", showFormPost);
btnSubmitGetForm.addEventListener("click", (e) => {
  e.preventDefault();
  getPost();
});
btnFindPost.addEventListener("click", findPost);
