import * as helpers from "./helper.js";

const list = document.querySelector("#popular").querySelectorAll(".item");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const emailNews = document.querySelector("#emailNewsletter");
const feedback = document.querySelector("#feedback");

document
  .getElementById("submitFeedback")
  .addEventListener("click", sendFeedback);
document
  .getElementById("submitNewsletter")
  .addEventListener("click", addNewsletter);
const getPosts = await helpers.getPosts();

function popularList() {
  for (let i = 0; i < list.length; i++) {
    const thumb = list[i].querySelector("img");
    const title = list[i].querySelector("h4");
    const route = list[i].querySelector("a");
    const date = list[i].querySelector("span");

    date.innerText = getPosts[i % 6].time;
    route.href = "detail_artikel.html?key=" + getPosts[i % 6].key;
    title.innerText = getPosts[i % 6].title;
    thumb.src = getPosts[i % 6].thumb;
  }
}

function sendFeedback(e) {
  e.preventDefault();
  if (name.value == "" || email.value == "" || feedback.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill the feedback form first",
    });
    return;
  }
  Swal.fire({
    icon: "success",
    title: "Feedback send",
    showConfirmButton: false,
    timer: 1500,
  });
}

function addNewsletter(e) {
  e.preventDefault();
  const regexEmail = /^[A-Za-z.]+[\w\d]+@\w+\.\w+/;
  console.log(emailNews.value);
  if (!emailNews.value.match(regexEmail)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please input valid email",
    });
    return;
  }
  Swal.fire({
    icon: "success",
    title: "Newsletter added",
    showConfirmButton: false,
    timer: 1500,
  });
}

popularList();
