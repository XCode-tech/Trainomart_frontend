export default async function sitemap() {
  const baseUrl = 'https://www.trainomart.com';

  // Static data
  const staticData = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 1.00,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/courses/machine-learning-with-python`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/courses/deep-learning-architectures-anns-to-transformers`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/courses/generative-ai-microsoft-azure-openai`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/courses/customizing-generative-ai-aws-bedrock`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/courses/ai-action-generative-models-langchain`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blogs-list`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: new Date('2024-11-28T02:21:16+00:00'),
      priority: 0.80,
    },
  ];

  // Fetch dynamic data from backend
  const backendUrl = 'https://test.trainomart.com/api/sitemap/';
  const res = await fetch(backendUrl);
  const backendData = await res.text();

  // Parse the backend XML data
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(backendData, 'application/xml');
  const urls = xmlDoc.getElementsByTagName('url');

  // Convert XML to a JavaScript array
  const dynamicData = Array.from(urls).map(url => ({
    url: url.getElementsByTagName('loc')[0].textContent,
    lastModified: new Date(url.getElementsByTagName('lastmod')[0].textContent),
    priority: parseFloat(url.getElementsByTagName('priority')[0].textContent),
  }));

  // Merge static data and dynamic data
  return [...staticData, ...dynamicData];
}
