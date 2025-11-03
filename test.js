import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;
const model = "gemini-2.5-flash";

async function testGemini() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Say hello from Gemini 2.5 Flash!" }] }],
      }),
    }
  );

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

testGemini();
