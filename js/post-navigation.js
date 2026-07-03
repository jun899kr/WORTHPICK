(async function () {
  const relatedList = document.getElementById("relatedPosts");
  const postNav = document.getElementById("postNav");

  if (!relatedList || !postNav) return;

  try {
    const res = await fetch("../../posts.json?v=" + Date.now());
    const posts = await res.json();

    const currentPath = window.location.pathname.replace(/^\/+/, "");
    const currentIndex = posts.findIndex(post => post.url === currentPath);

    if (currentIndex === -1) {
      relatedList.innerHTML = "<li>관련 글을 찾을 수 없습니다.</li>";
      postNav.innerHTML = "";
      return;
    }

    const currentPost = posts[currentIndex];

    // 같은 카테고리 1개 우선
    const sameCategory = posts.filter(post =>
      post.category === currentPost.category &&
      post.url !== currentPost.url
    );

    // 다른 카테고리 글
    const otherCategory = posts.filter(post =>
      post.category !== currentPost.category &&
      post.url !== currentPost.url
    );

    const related = [...sameCategory.slice(0, 1), ...otherCategory]
      .slice(0, 3);

    relatedList.innerHTML = related
      .map(post => `
        <li>
          <a href="../../${post.url}">${post.title}</a>
        </li>
      `)
      .join("");

    const prev = posts[currentIndex - 1];
    const next = posts[currentIndex + 1];

    postNav.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;">
        <div>
          ${
            prev
              ? `<a href="../../${prev.url}">← ${prev.title}</a>`
              : `<span>← 이전 글 없음</span>`
          }
        </div>

        <div>
          ${
            next
              ? `<a href="../../${next.url}">${next.title} →</a>`
              : `<span>다음 글 없음 →</span>`
          }
        </div>
      </div>
    `;
  } catch (e) {
    console.error(e);
  }
})();
