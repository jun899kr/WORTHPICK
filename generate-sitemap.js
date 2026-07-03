const fs = require("fs");

const SITE_URL = "https://worthpick.co.kr";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const posts = JSON.parse(fs.readFileSync("posts.json", "utf8"));
const today = new Date().toISOString().split("T")[0];

const fixedPages = [
  { url: "/", lastmod: today, changefreq: "daily", priority: "1.0" },
  { url: "/about.html", lastmod: today, changefreq: "monthly", priority: "0.5" },
  { url: "/privacy.html", lastmod: today, changefreq: "yearly", priority: "0.3" },
  { url: "/contact.html", lastmod: today, changefreq: "yearly", priority: "0.3" }
];

const postPages = posts.map(post => ({
  url: "/" + post.url,
  lastmod: post.date,
  changefreq: "monthly",
  priority: "0.8"
}));

const pages = [...fixedPages, ...postPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${escapeXml(SITE_URL + page.url)}</loc>
    <lastmod>${escapeXml(page.lastmod)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync("sitemap.xml", xml, "utf8");

console.log("sitemap.xml generated successfully.");
