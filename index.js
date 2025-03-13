export default {
  async fetch(request) {
    const url = new URL(request.url);
    const symbol = url.searchParams.get("symbol");
    if (!symbol) {
      return new Response(JSON.stringify({ error: "Missing symbol parameter" }), { status: 400 });
    }
    
    const binanceUrl = `https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}`;
    
    try {
      const response = await fetch(binanceUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Request failed" }), { status: 500 });
    }
  }
}
