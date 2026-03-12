// ============================================================
//  VitaRoot — Secure AI Proxy (Netlify Function)
//  Your ANTHROPIC_API_KEY lives only in Netlify env vars.
//  The browser never sees it.
// ============================================================

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // CORS headers — update origin to your real domain after launch
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Check API key exists in environment
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY environment variable is not set");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error. API key not set." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  // Validate required fields
  if (!body.messages || !Array.isArray(body.messages)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "messages array is required" }) };
  }

  // Rate limiting hint — Netlify functions have a 10s timeout by default
  // For production, add a database-backed rate limiter here

  try {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: body.max_tokens || 1000,
        system: body.system || undefined,
        messages: body.messages,
      }),
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json().catch(() => ({}));
      console.error("Anthropic API error:", anthropicResponse.status, errorData);
      return {
        statusCode: anthropicResponse.status,
        headers,
        body: JSON.stringify({ error: "AI service error", details: errorData }),
      };
    }

    const data = await anthropicResponse.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };

  } catch (err) {
    console.error("Proxy fetch error:", err);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: "Failed to reach AI service. Please try again." }),
    };
  }
};
