/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['127.0.0.1', 'localhost', 'test.trainomart.com'], // Add both '127.0.0.1' and 'localhost'
    },
    async redirects() {
        return [
            {
                source: '/courses/9',
                destination: '/courses/machine-learning-with-python',
                permanent: true, // 301 Redirect
            },
            {
                source: '/courses/8',
                destination: '/courses/deep-learning-architectures-anns-to-transformers',
                permanent: true,
            },
            {
                source: '/courses/Deep-Reinforcement-Learning-Combining-Neural-Networks-and-Decision-Making',
                destination: '/courses/deep-reinforcement-learning-combining-neural-networks-and-decision-making',
                permanent: true,
            },
            {
                source: '/courses/Generative-AI-with-Google-Gemini',
                destination: '/courses/generative-ai-with-google-gemini',
                permanent: true,
            },
            {
                source: '/courses/Self-Supervised-Learning-Unlocking-the-Power-of-Unlabeled-Data',
                destination: '/courses/self-supervised-learning-unlocking-the-power-of-unlabeled-data',
                permanent: true,
            },
            {
                source: '/courses/7',
                destination: '/courses/generative-ai-microsoft-azure-openai',
                permanent: true,
            },
            {
                source: '/courses/6',
                destination: '/courses/customizing-generative-ai-aws-bedrock',
                permanent: true,
            },
            {
                source: '/courses/5',
                destination: '/courses/ai-action-generative-models-langchain',
                permanent: true,
            },
            {
                source: '/blogs/Mastering-LangChain-Your-Guide-to-LLM-Application',
                destination: '/blogs/mastering-langchain-your-guide-to-llm-application',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
