import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET() {
  const baseUrl = "https://www.trainomart.com";
  const staticUrls = [
    { loc: `${baseUrl}/`, priority: 1.0 },
    { loc: `${baseUrl}/signup`, priority: 0.8 },
    { loc: `${baseUrl}/courses`, priority: 0.8 },
    { loc: `${baseUrl}/about`, priority: 0.8 },
    { loc: `${baseUrl}/blogs-list`, priority: 0.8 },
    { loc: `${baseUrl}/contact`, priority: 0.8 },
  ];

  // Fetch dynamic data
  let dynamicUrls = [];
  try {
    const response = await fetch("https://test.trainomart.com/api/sitemap/");
    const data = await response.json();
    dynamicUrls = data.map((item) => ({
      loc: item.url,
      priority: item.priority || 0.8,
    }));
  } catch (error) {
    console.error("Error fetching dynamic URLs:", error);
  }

  // Combine static and dynamic URLs
  const allUrls = [...staticUrls, ...dynamicUrls];

  // Generate XML
  const sitemapXml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) => `
        <url>
          <loc>${url.loc}</loc>
          <priority>${url.priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
