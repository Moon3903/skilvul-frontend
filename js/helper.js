export const getPosts = async () => {
  // EDIT HERE
  // title desc(description) time(publish date) thumb(thumbnail)
  // tag(tipe berita) key(untuk di passing kalo di klil)
  try {
    const postDetail = await fetch(
      "https://the-lazy-media-api.vercel.app/api/tech?page=1"
    );
    return postDetail.json();
  } catch (error) {
    console.log("getPost", error);
    throw error;
  }
};

export const getPost = async (post_id) => {
  // EDIT HERE
  // author categories(tag array) content(isi berita)
  // title thumb date
  let postDetail;
  try {
    postDetail = await fetch(
      "https://the-lazy-media-api.vercel.app/api/detail/" + post_id
    );
    return postDetail.json();
  } catch (error) {
    console.log("getPost", error);
    throw error;
  }
};

export const getRandomPic = async () => {
  try {
    const image = await fetch("https://source.unsplash.com/random/720x480");
    return image.url;
  } catch (error) {
    console.log("getRandomPic", error);
    throw error;
  }
};

export const getRandomProfile = async () => {
  try {
    const image = await fetch("https://source.unsplash.com/480x480/?profile");
    return image.url;
  } catch (error) {
    console.log("getRandomProfile", error);
    throw error;
  }
};
