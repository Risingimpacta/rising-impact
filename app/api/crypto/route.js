import { NextResponse } from "next/server";

// Coin IDs to fetch
const COIN_IDS = [
  "bitcoin", "ethereum", "binancecoin", "ripple", "dogecoin",
  "solana", "tron", "cardano", "zcash", "bitcoin-cash",
  "stellar", "litecoin", "shiba-inu", "near", "internet-computer",
  "aave", "ethereum-classic", "polygon"
];

export async function GET() {
  try {
    // Fetch from CoinGecko API
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`;
    
    const response = await fetch(url, {
      next: { revalidate: 30 } // Cache for 30 seconds
    });
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the data with CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    console.error("Crypto API error:", error);
    
    // Return fallback data
    const fallbackData = [
      { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 65000, price_change_percentage_24h: 2.5, image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", sparkline_in_7d: { price: [] } },
      { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3500, price_change_percentage_24h: 1.8, image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", sparkline_in_7d: { price: [] } },
      { id: "solana", symbol: "sol", name: "Solana", current_price: 180, price_change_percentage_24h: -1.2, image: "https://assets.coingecko.com/coins/images/4128/large/solana.png", sparkline_in_7d: { price: [] } }
    ];
    
    return NextResponse.json(fallbackData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}