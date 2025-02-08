import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET() {
  const baseUrl = "https://www.trainomart.com";

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: 1.0 },
    { loc: `${baseUrl}/courses`, priority: 0.8 },
    { loc: `${baseUrl}/about`, priority: 0.8 },
    { loc: `${baseUrl}/blogs-list`, priority: 0.8 },
    { loc: `${baseUrl}/contact`, priority: 0.8 },
    { loc: `${baseUrl}/business`, priority: 0.8 },
    { loc: `${baseUrl}/help-center`, priority: 0.8 },
  ];

  let dynamicUrls = [];
  try {
    const response = await fetch("https://test.trainomart.com/api/sitemap/");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const xmlData = await response.text(); // Read XML response
    const parsedData = await parseStringPromise(xmlData); // Parse XML to JS object

    const urls = parsedData.urlset.url; // Access URLs in parsed data
    dynamicUrls = urls
      .map((url) => ({
        loc: url.loc[0],
        priority: parseFloat(url.priority[0]) || 0.8,
      }))
      .filter((url) => !url.loc.includes("/login")); // Filter out '/login'
  } catch (error) {
    console.error("Error fetching dynamic URLs:", error);
  }

  const allUrls = [...staticUrls, ...dynamicUrls];

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

  return new NextResponse(sitemapXml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
