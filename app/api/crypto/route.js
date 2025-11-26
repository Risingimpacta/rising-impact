export async function GET() {
  try {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets" +
      "?vs_currency=usd" +
      "&ids=bitcoin,ethereum,binancecoin,ripple,dogecoin,solana,tron,cardano,zcash,bitcoin-cash," +
      "stellar,litecoin,shiba-inu,near,internet-computer,aave,ethereum-classic,polygon,tether,usd-coin" +
      "&order=market_cap_desc&sparkline=true&price_change_percentage=24h";

    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }, // avoids CG bot block
      next: { revalidate: 10 },
    });

    const json = await r.json();
    return Response.json(json);
  } catch (err) {
    return Response.json({ error: "Coin fetch failed", reason: err.toString() }, { status: 500 });
  }
}
