// import { createChatSession } from "@/configs/AiModels";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { prompt } = await req.json();
//     console.log("Prompt received:", prompt);

//     const chat = await createChatSession(); //updated

//     const result = await chat.sendMessage(prompt);
//     let responseText = result.response.text();
//     console.log("Raw Gemini response:", responseText);

//     responseText = responseText.replace(/```json|```/g, "").trim();
//     const parsed = JSON.parse(responseText);

//     return NextResponse.json({ result: parsed });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: error.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

const { createChatSession } = require("@/configs/AiModels");
const { NextResponse } = require("next/server");

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    // console.log("🟢 Prompt received:", prompt);

    const chat = await createChatSession();
    const result = await chat.sendMessage(prompt);

    let responseText = result.response.text();
    console.log("📩 Raw Gemini response:", responseText);

    const cleaned = responseText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
