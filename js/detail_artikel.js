import * as helpers from "./helper.js";

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get("key");
const recent = document.querySelectorAll(".single-post");
const contents = document.querySelector(".blog-post");
const thumb = document.querySelector(".bg-image");
const comments = document.querySelector(".blog-comments");
const commentContent = document.querySelector("#contentComment");
const nameContent = document.querySelector("#nameComment");
const emailContent = document.querySelector("#emailCommnet");

document.getElementById("newComment").addEventListener("click", addComment);
const detail = await helpers.getPost(key);
const getPosts = await helpers.getPosts();

// console.log(detail);

function recentList() {
  for (let i = 0; i < recent.length; i++) {
    const thumb = recent[i].querySelector("img");
    const route = recent[i].querySelectorAll("a");
    const auth = recent[i].querySelector("small");
    const title = route[1];

    for (let k = 0; k < route.length; k++) {
      route[k].href = route[k].href + "?key=" + getPosts[i].key;
    }

    thumb.src = getPosts[i].thumb;
    auth.innerText = "By : " + getPosts[i].author + ". " + getPosts[i].time;
    title.innerText = getPosts[i].title;
  }
}

function details() {
  const content = detail.results.content;
  contents.innerHTML = "";

  const title = document.createElement("h2");
  title.innerText = detail.results.title;

  contents.appendChild(title);

  thumb.style = "background-image:url(" + detail.results.thumb + ")";

  for (let i = 0; i < content.length; i++) {
    let str = content[i];
    if (
      str.startsWith("http") ||
      str.startsWith("\n\n") ||
      str.startsWith("\n\t")
    )
      continue;
    const tambah = document.createElement("p");
    tambah.innerText = str;
    contents.appendChild(tambah);
  }
  //   contents.insertAdjacentHTML("beforeend", "<p>tes</p>");
}

async function addComment(e) {
  e.preventDefault();

  if ((commentContent.value == "") | (nameContent.value == "")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill the comment form first",
    });
    return;
  } else {
    Swal.fire({
      icon: "success",
      title: "Comment added",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  const pic = await helpers.getRandomProfile();

  comments.insertAdjacentHTML(
    "beforeend",
    `<div class="media">
        <div class="media-left">
            <img src="${pic}" alt="">
        </div>
        <div class="media-body">
            <h4 class="media-heading">${nameContent.value}</h4>
            <p>${commentContent.value}</p>
            <div class="date-reply"><span>Oct 18, 2017 - 4:00AM</span><a href="#" class="reply">Reply</a></div>
        </div>
    </div>`
  );
  commentContent.value = "";
  nameContent.value = "";
  emailContent.value = "";
}

recentList();
details();