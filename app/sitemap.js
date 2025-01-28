import { parseStringPromise } from "xml2js";

export async function getServerSideProps({ res }) {
  const baseUrl = "https://www.trainomart.com";

  // Static data
  const staticData = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/courses`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs-list`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.8,
    },
  ];

  // Fetch dynamic data
  const backendUrl = "https://test.trainomart.com/api/sitemap/";
  let dynamicData = [];

  try {
    const response = await fetch(backendUrl);
    const xmlData = await response.text();

    // Parse XML data
    const parsedData = await parseStringPromise(xmlData);
    const urls = parsedData.urlset.url;

    // Convert parsed XML to JavaScript array
    dynamicData = urls.map((url) => ({
      url: url.loc[0],
      lastModified: new Date(url.lastmod[0]).toISOString(),
      priority: parseFloat(url.priority[0]),
    }));
  } catch (error) {
    console.error("Error fetching dynamic sitemap data:", error);
  }

  // Merge static and dynamic data
  const sitemapData = [...staticData, ...dynamicData];

  // Generate XML
  const sitemapXml = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapData
        .map(
          (item) => `
        <url>
          <loc>${item.url}</loc>
          <lastmod>${item.lastModified}</lastmod>
          <priority>${item.priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

  // Set response headers
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemapXml);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
