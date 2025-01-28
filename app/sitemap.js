import { parseStringPromise } from 'xml2js';

// Server-Side Rendering for dynamic sitemap generation
export async function getServerSideProps() {
  const baseUrl = 'https://www.trainomart.com';

  // Static data
  const staticData = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
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

  // Fetch dynamic data from backend API
  const backendUrl = 'https://test.trainomart.com/api/sitemap/';
  let dynamicData = [];

  try {
    const res = await fetch(backendUrl);
    const backendData = await res.text();

    // Parse the XML data using xml2js
    const parsedData = await parseStringPromise(backendData);
    const urls = parsedData.urlset.url;

    // Convert parsed XML to JavaScript array
    dynamicData = urls.map((url) => ({
      url: url.loc[0],
      lastModified: new Date(url.lastmod[0]),
      priority: parseFloat(url.priority[0]),
    }));
  } catch (error) {
    console.error('Error fetching or parsing dynamic sitemap data:', error);
  }

  // Merge static data with dynamic data
  const sitemapData = [...staticData, ...dynamicData];

  return {
    props: {
      sitemapData,
    },
  };
}

// React Component for the Sitemap Page
export default function SitemapPage({ sitemapData }) {
  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        {sitemapData.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.url}</a> - Last Modified: {item.lastModified.toISOString()} - Priority: {item.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}
