export async function getServerSideProps() {
  const baseUrl = 'https://www.trainomart.com';
  const sitemapApiUrl = 'https://test.trainomart.com/api/sitemap/';

  try {
    // Fetch sitemap data from your backend API
    const response = await fetch(sitemapApiUrl);
    const data = await response.json();

    // Static Routes
    const staticRoutes = [
      { url: `${baseUrl}/`, lastModified: '2025-01-26', priority: 1.0 },
      { url: `${baseUrl}/login`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/signup`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/courses`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/about`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/blogs-list`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/contact`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/business`, lastModified: '2025-01-26', priority: 0.8 },
      { url: `${baseUrl}/help-center`, lastModified: '2025-01-26', priority: 0.8 },
    ];

    // Dynamic Routes (courses and blogs)
    const dynamicRoutes = [
      ...data.courses.map((course) => ({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: course.lastModified, // Ensure the API sends lastModified for each course
        priority: 0.8,
      })),
      ...data.blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.lastModified, // Ensure the API sends lastModified for each blog
        priority: 0.8,
      })),
    ];

    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Generate XML sitemap content
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    allRoutes.forEach((entry) => {
      xmlContent += `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <priority>${entry.priority}</priority>
        </url>
      `;
    });

    xmlContent += '</urlset>';

    return {
      props: {
        sitemap: xmlContent,
      },
    };
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return {
      props: {
        sitemap: null,
      },
    };
  }
}

export default function Sitemap({ sitemap }) {
  if (!sitemap) {
    return <div>Error generating sitemap</div>;
  }

  return (
    <div>
      <pre>{sitemap}</pre>
    </div>
  );
}
