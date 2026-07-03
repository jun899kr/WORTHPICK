async function renderPostNavigation() {
  try {
    const relatedPostsEl = document.getElementById("relatedPosts");
    const postNavEl = document.getElementById("postNav");

    if (!relatedPostsEl || !postNavEl) return;

    const response = await fetch("../../posts.json?v=" + new Date().getTime());
    const posts = await response.json();

    const currentPath = window.location.pathname
      .replace(/^\/+/, "");

    const currentIndex = posts.findIndex(post => post.url === currentPath);

    if (currentIndex === -1) {
      relatedPostsEl.innerHTML = "<li>관련 글을 불러오지 못했습니다.</li>";
      postNavEl.innerHTML = "<span>이전/다음 글을 불러오지 못했습니다.</span>";
      return;
    }

    const currentPost = posts[currentIndex];

    const relatedPosts = posts
      .filter(post => post.url !== currentPost.url)
      .sort((a, b) => {
        if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
        if (a.category !== currentPost.category && b.category === currentPost.category) return 1;
        return 0;
      })
      .slice(0, 3);

    relatedPostsEl.innerHTML = relatedPosts.map(post => `
      <li>
        <a href="../../${post.url}">${post.title}</a>
      </li>
    `).join("");

    const prevPost = posts[currentIndex - 1];
    const nextPost = posts[currentIndex + 1];

    postNavEl.innerHTML = `
      ${prevPost ? `<a href="../../${prevPost.url}">← ${prevPost.title}</a>` : `<span>← 이전 글 없음</span>`}
      ${nextPost ? `<a href="../../${nextPost.url}">${nextPost.title} →</a>` : `<span>다음 글 없음 →</span>`}
    `;
  } catch (error) {
    const relatedPostsEl = document.getElementById("relatedPosts");
    const postNavEl = document.getElementById("postNav");

    if (relatedPostsEl) {
      relatedPostsEl.innerHTML = "<li>관련 글을 불러오지 못했습니다.</li>";
    }

    if (postNavEl) {
      postNavEl.innerHTML = "<span>이전/다음 글을 불러오지 못했습니다.</span>";
    }

    console.error(error);
  }
}

renderPostNavigation();
