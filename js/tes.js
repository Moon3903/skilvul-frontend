import * as helpers from "./helper.js";

//get posts
console.log("Post list");
let getPosts = await helpers.getPosts();


console.log(getPosts);
console.log("Post Detail");
for (let i = 0; i < getPosts.length; i++) {
  let detail = await helpers.getPost(getPosts[i].key);
  console.log(detail.results);
}
