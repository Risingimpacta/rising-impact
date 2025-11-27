export async function GET() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/global', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch global data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}