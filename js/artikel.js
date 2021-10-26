import * as helpers from "./helper.js";

const list = document.querySelectorAll(".single-blog");
const recent = document.querySelectorAll(".single-post");

const getPosts = await helpers.getPosts();

function articleList() {
  for (let i = 0; i < list.length; i++) {
    const thumb = list[i].querySelector("img");
    const route = list[i].querySelectorAll("a");
    const desc = list[i].querySelector("h4");
    const auth = list[i].querySelector(".blog-meta-author").querySelector("a");
    const date = list[i].querySelector(".pull-right").querySelector("span");

    for (let k = 0; k < route.length; k++) {
      route[k].href = route[k].href + "?key=" + getPosts[i].key;
    }

    thumb.src = getPosts[i].thumb;
    desc.innerText = getPosts[i].title;
    auth.href = "#";
    auth.innerText = getPosts[i].author;
    date.innerText = getPosts[i].time;
  }
}

function recentList() {
  for (let i = 0; i < recent.length; i++) {
    const thumb = recent[i].querySelector("img");
    const route = recent[i].querySelectorAll("a");
    const auth = recent[i].querySelector("small");
    const title = route[1];

    for (let k = 0; k < route.length; k++) {
      route[k].href = route[k].href + "?key=" + getPosts[i + list.length].key;
    }

    thumb.src = getPosts[i + list.length].thumb;
    auth.innerText =
      "By : " +
      getPosts[i + list.length].author +
      ". " +
      getPosts[i + list.length].time;
    title.innerText = getPosts[i + list.length].title;
  }
}

articleList();
recentList();
