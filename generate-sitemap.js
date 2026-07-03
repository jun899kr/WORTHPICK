
const fs = require("fs");

const SITE_URL = "https://worthpick.co.kr";

const posts = JSON.parse(fs.readFileSync("posts.json", "utf8"));

const today = new Date().toISOString().split("T")[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${SITE_URL}/</loc>
<lastmod>${today}</lastmod>
<changefreq>daily</changefreq>
<priority>1.0</priority>
</url>

<url>
<loc>${SITE_URL}/about.html</loc>
<lastmod>${today}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.5</priority>
</url>

<url>
<loc>${SITE_URL}/privacy.html</loc>
<lastmod>${today}</lastmod>
<changefreq>yearly</changefreq>
<priority>0.3</priority>
</url>

<url>
<loc>${SITE_URL}/contact.html</loc>
<lastmod>${today}</lastmod>
<changefreq>yearly</changefreq>
<priority>0.3</priority>
</url>
`;

posts.forEach(post => {

xml += `
<url>
<loc>${SITE_URL}/${post.url}</loc>
<lastmod>${post.date}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.8</priority>
</url>
`;

});

xml += `
</urlset>
`;

fs.writeFileSync("sitemap.xml", xml);

console.log("sitemap.xml generated successfully.");
