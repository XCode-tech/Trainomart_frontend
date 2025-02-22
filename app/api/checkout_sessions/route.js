import Stripe from 'stripe';
import API_URL from "@/data/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const contentType = req.headers.get('Content-Type') || '';
    let body;

    // Parse the incoming request body
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const rawBody = await req.text();
      body = Object.fromEntries(new URLSearchParams(rawBody));
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported content type.' }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Request Body:', body);

    // Extract the slug and leadId from the request body
    const slug = typeof body.slug === 'string' ? body.slug : body.slug.slug;
    const leadId = body.leadId; // Get the leadId from the request body

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!leadId) {
      return new Response(JSON.stringify({ error: 'Lead ID is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch PRICE_ID from your API
    const response = await fetch(`${API_URL}/courses/slug/${slug}`);
    const courseData = await response.json();

    // Extract PRICE_ID (buy_button_id) from API response
    const priceId = courseData?.buy_button_id;

    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Price ID not found for the given slug.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?leadId=${leadId}`, 
      cancel_url: `${req.headers.get('origin')}/cancel?leadId=${leadId}`,  
    });

    console.log('Stripe Session URL:', session.url);

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
