import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.trainomart.com'
  
  return [
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
  ]
}

