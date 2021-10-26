import * as helpers from "./helper.js";

const list = document.querySelector("#popular").querySelectorAll(".item");
console.log(list[0]);

const getPosts = await helpers.getPosts();

function popularList(){
    for(let i=0;i<list.length;i++){
        const thumb = list[i].querySelector("img");
        const title = list[i].querySelector("h4");
        const route = list[i].querySelector("a");
        const date = list[i].querySelector("span")

        date.innerText = getPosts[i%6].time;
        route.href = "detail_artikel.html?key="+getPosts[i%6].key;
        title.innerText = getPosts[i%6].title;
        thumb.src = getPosts[i%6].thumb;
    }
}

popularList();