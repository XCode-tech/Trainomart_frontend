import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();

    // Define a mapping for case-insensitive routes
    const routeMappings = {
        '/courses/9': '/courses/machine-learning-with-python',
        '/courses/8': '/courses/deep-learning-architectures-anns-to-transformers',
        '/courses/Deep-Reinforcement-Learning-Combining-Neural-Networks-and-Decision-Making': '/courses/deep-reinforcement-learning-combining-neural-networks-and-decision-making',
        '/courses/Generative-AI-with-Google-Gemini': '/courses/generative-ai-with-google-gemini',
        '/courses/Self-Supervised-Learning-Unlocking-the-Power-of-Unlabeled-Data': '/courses/self-supervised-learning-unlocking-the-power-of-unlabeled-data',
        '/courses/7': '/courses/generative-ai-microsoft-azure-openai',
        '/courses/6': '/courses/customizing-generative-ai-aws-bedrock',
        '/courses/5': '/courses/ai-action-generative-models-langchain',
        '/blogs/Mastering-LangChain-Your-Guide-to-LLM-Application': '/blogs/mastering-langchain-your-guide-to-llm-application',
    };

    const matchedRoute = routeMappings[url.pathname];
    if (matchedRoute) {
        url.pathname = matchedRoute;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}
