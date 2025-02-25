import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Redirect non-www requests to www
  if (!url.hostname.startsWith('www.')) {
    // Update the hostname to include 'www.'
    url.hostname = `www.${url.hostname}`;
    return NextResponse.redirect(url); // Perform the redirect to the 'www' version
  }

  // Check if the URL matches "/courses/[anything]" pattern
  // const regex = /^\/courses\/[^/]+$/;  // Matches "/courses/anything"
  // if (regex.test(url.pathname)) {
  //   // Redirect to the homepage
  //   url.pathname = '/';  // Set the pathname to the homepage
  //   return NextResponse.redirect(url); // Perform the redirect
  // }

  // Define a mapping for specific routes
  const routeMappings = {
    'https://www.trainomart.com/login': 'https://www.trainomart.com',
    '/courses/9': '/courses/machine-learning-with-python',
    '/courses/8': '/courses/deep-learning-architectures-anns-to-transformers',
    // '/courses/Deep-Reinforcement-Learning-Combining-Neural-Networks-and-Decision-Making': '/courses/deep-reinforcement-learning-combining-neural-networks-and-decision-making',
    '/courses/Generative-AI-with-Google-Gemini': '/courses/generative-ai-with-google-gemini',
    // '/courses/Self-Supervised-Learning-Unlocking-the-Power-of-Unlabeled-Data': '/courses/self-supervised-learning-unlocking-the-power-of-unlabeled-data',
    '/courses/7': '/courses/generative-ai-microsoft-azure-openai',
    '/courses/6': '/courses/customizing-generative-ai-aws-bedrock',
    '/courses/5': '/courses/ai-action-generative-models-langchain',
    // '/blogs/Mastering-LangChain-Your-Guide-to-LLM-Application': '/blogs/mastering-langchain-your-guide-to-llm-application',
  };

  // Convert the pathname to lowercase to handle case insensitivity
  const pathnameLower = url.pathname.toLowerCase();

  // Iterate over the routeMappings and check for a match (case-insensitive)
  for (const [original, redirect] of Object.entries(routeMappings)) {
    if (pathnameLower === original.toLowerCase()) {
      url.pathname = redirect; // Update the pathname to the mapped one
      return NextResponse.rewrite(url); // Rewrite the request to the new URL
    }
  }

  return NextResponse.next(); // If no match, proceed with the original request
}
