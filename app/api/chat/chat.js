// app/api/chat/route.js

export async function POST(request) {
  const { query } = await request.json();

  if (!query || typeof query !== "string") {
    return new Response(JSON.stringify({ error: "Invalid query provided." }), {
      status: 400,
    });
  }

  if (!query.toLowerCase().includes("brain tumor")) {
    return new Response(
      JSON.stringify({
        error: "This chatbot only answers queries related to brain tumors.",
      }),
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    const response = await fetch("https://api.google.com/gemini/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt: query }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Error from Google Gemini API" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify({ response: data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
///
