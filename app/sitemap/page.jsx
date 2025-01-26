export async function GET(req) {
    const djangoApiUrl = 'https://www.trainomart.com/api/sitemap/'; // Django API URL

    try {
        const response = await fetch(djangoApiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from Django API: ${response.statusText}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching data from Django backend:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            {
                status: 500,
            }
        );
    }
}
