// so much empty
// 1. Fetch and Display Posts
// ● Use fetch() to retrieve a list of posts from
// https://jsonplaceholder.typicode.com/posts
// ● Convert the response to JSON
// ● Dynamically render the post titles and bodies inside the #postList div
// 2. Create and Send a New Post
// ● Add a form with title and body fields
// ● Use fetch() with the POST method to send the data as JSON to the API
// ● Show a confirmation message with the response data
// 3. Add Loading and Error States
// ● Show a “Loading…” message while the fetch is in progress
// ● Display an error message if the fetch fails


const fetchButton = document.getElementById("fetchButton");
fetchButton.addEventListener("click", () => {
    fetchPosts();
});

document.getElementById("postForm").addEventListener("submit", handleSubmit);
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");
const formError = document.getElementById("formError");
//const formSuccess = document.getElementById("formSuccess"); I'm using alert instead of this div
errorDiv.style.color = "red";
formError.style.color = "red";

const delay = ms => new Promise(res => setTimeout(res, ms)); // utility function for a delay

async function fetchPosts() {
    try {
        postList.innerHTML = "<p>Loading...</p>";
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            errorDiv.innerHTML = `<p>Error: something went wrong. Response status: ${response.status}</p>`;
            postList.innerHTML = "";
            return;
        }
        const data = await response.json();
        console.log(data);
        //console.log(huhi);
        await delay(1000); // delay to see the loading message
        renderPosts(data);
    } catch(err) {
        errorDiv.innerHTML = `<p>${err.name}: ${err.message}.</p>`;
        postList.innerHTML = "";
    }
}

function renderPosts(posts) {
    postList.innerHTML = "";
    posts.forEach((el) => {
        const newPost = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = el.title;
        const body = document.createElement("p");
        body.textContent = el.body;
        newPost.append(title, body, document.createElement("hr"));
        postList.appendChild(newPost);
    });
}

async function submitPost(post) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post)
    });
    if (response.ok) {
        alert("Post submitted successfully!\nResponse status: " + response.status);
    } else {
        alert("Failed to create a new post.");
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const titleInput = document.getElementById("titleInput").value.trim();
    const bodyInput = document.getElementById("bodyInput").value.trim();
    if (!titleInput || !bodyInput) {
        formError.innerHTML = "<p>Title and body must not be blank.</p>";
        return;
    }
    try {
        submitPost({title: titleInput, body: bodyInput});
    } catch(err) {
        formError.innerHTML = `<p>${err.name}: ${err.message}.</p>`;
    }
}