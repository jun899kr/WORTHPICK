(async function () {
  const relatedList = document.getElementById("relatedPosts");
  const postNav = document.getElementById("postNav");

  if (!relatedList || !postNav) return;

  try {
    const res = await fetch("../../posts.json?v=" + Date.now());
    const posts = await res.json();

    // 현재 페이지 찾기
    const currentPath = window.location.pathname.replace(/^\/+/, "");
    const currentIndex = posts.findIndex(post => post.url === currentPath);

    if (currentIndex === -1) {
      relatedList.innerHTML = "<li>관련 글을 찾을 수 없습니다.</li>";
      postNav.innerHTML = "";
      return;
    }

    const currentPost = posts[currentIndex];

    // =====================
    // 함께 읽으면 좋은 글
    // =====================

    let related = posts.filter(post =>
      post.category === currentPost.category &&
      post.url !== currentPost.url
    );

    // 같은 카테고리가 부족하면 최신 순으로 채움
    if (related.length < 3) {
      posts.forEach(post => {
        if (
          post.url !== currentPost.url &&
          !related.find(r => r.url === post.url)
        ) {
          related.push(post);
        }
      });
    }

    related = related.slice(0, 3);

    relatedList.innerHTML = related
      .map(
        post => `
      <li>
        <a href="../../${post.url}">
          ${post.title}
        </a>
      </li>
    `
      )
      .join("");

    // =====================
    // 이전글 / 다음글
    // =====================

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
