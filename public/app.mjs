let posting = document.querySelector("#posting");

posting.addEventListener("submit", (event) => {

    event.preventDefault();
    let postTitleInput = document.querySelector("#titleName");
    let postTextInput = document.querySelector("#postText");
    postTitle = postTitleInput.value;
    postText = postTextInput.value;
    axios.post('/api/post', {
        title: postTitle,
        text: postText
    })
        .then(function (response) {

            console.log(response.data);
            let child = document.querySelector("#posts");
            let parent = child.parentNode;
            let postCreated = document.createElement("div");
            postCreated.setAttribute("class", "postCreated");
            let reaquest = document.createElement("h1");
            reaquest.setAttribute("class", "request");

            reaquest.innerHTML = response.data
            postCreated.appendChild(reaquest);
            postTitleInput.value = '';
            postTextInput.value = '';
            parent.appendChild(postCreated);
            let body = parent.parentNode;
            body.style.overflow = 'hidden';
            setTimeout(function () {
                const parent = document.querySelector(".postCreated");
                parent.remove(); body.style.overflow = 'auto';
            }, 2000)

            getAllPosts();
        }).catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#posts").innerHTML = "error in post submission"
        })


})



window.getAllPosts = function () {
    axios.get('/api/posts')
        .then(function (response) {
            console.log(response.data);
            let allPosts = document.querySelector("#posts");
            allPosts.innerHTML = '';

            response.data.map((eachPost) => {
                let postCard = document.createElement("div");
                postCard.setAttribute("class", "post-card");
                postCard.setAttribute("id", `card-${eachPost.id}`);
                let titleName = document.createElement("h2");
                titleName.setAttribute("class", "title-name");
                let postText = document.createElement("p");
                postText.setAttribute("class", "post-text");
                titleName.innerHTML = eachPost.title;
                postText.innerHTML = eachPost.text;
                let deleteBtn = document.createElement("button");
                let editBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "delete-btn");
                editBtn.setAttribute("class", "edit-btn");
                deleteBtn.innerHTML = "Delete post";
                editBtn.innerHTML = "Edit post";
                deleteBtn.onclick = function () {
                    delPost(eachPost.id);
                };
                editBtn.onclick = function () {
                    editPost(eachPost.id, eachPost.title, eachPost.text);
                };
                postCard.appendChild(titleName);
                postCard.appendChild(postText);
                postCard.appendChild(deleteBtn);
                postCard.appendChild(editBtn);
                allPosts.appendChild(postCard);


            })
        }).catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#posts").innerHTML = "error in post submission"
        })
}


function delPost(postId) {


    console.log("delete: ", postId);


    axios.delete(`/api/post/${postId}`)
        .then(function (response) {
            console.log(response.data);

            getAllPosts();
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#posts").innerHTML = "error in post submission"
        })

}

function editPost(postId, title, text) {
    console.log("delete: ", postId);

    document.querySelector(`#card-${postId}`).innerHTML =
        `<form onsubmit="savePost('${postId}')">
            title: <input type='text' value='${title}' id='title-${postId}' />
            <br/>
            text: <input type='text' value='${text}' id='text-${postId}' />
            <br/>
            <button>Save</button>

        </form>`
}

window.savePost = (postId) => {
    const updatedTitle = document.querySelector(`#title-${postId}`).value;
    const updatedText = document.querySelector(`#text-${postId}`).value;

    axios.put(`/api/post/${postId}`, {
        title: updatedTitle,
        text: updatedText
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission"
        })

}