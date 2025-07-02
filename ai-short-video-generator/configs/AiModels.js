// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// require("dotenv").config();

// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//   throw new Error("❌ GEMINI_API_KEY is missing in environment variables.");
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const createChatSession = () =>
//   model.startChat({
//     generationConfig: {
//       temperature: 1,
//       topP: 0.95,
//       topK: 64,
//       maxOutputToken: 8192,
//       responseMimeType: "application/json",
//     },

//     history: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: "Write a script to generate 30 seconds video on topic: interesting history story with AI image prompt with realistic format for each scene and give me result in JSON format and imageprompt and contenttext as a field",
//           },
//         ],
//       },

//       {
//         role: "model",
//         parts: [
//           {
//             text: `\`\`\`json
// {
//   "title": "Wojtek: The Bear Who Became a Soldier",
//   "total_duration_seconds": 30,
//   "video_script": [
//     {
//       "scene_number": 1,
//       "duration_seconds": 6,
//       "contenttext": "Did you know a bear officially served in World War II and was even promoted? This is the incredible true story of Wojtek.",
//       "imageprompt": "hyperrealistic cinematic photo, 1940s color photography style, a large Syrian brown bear stands calmly among a group of Polish soldiers..."
//     },
//     ...
//   ]
// }
// \`\`\`
// `,
//           },
//         ],
//       },
//     ],
//   });

// module.exports = { createChatSession };

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(" GEMINI_API_KEY is missing in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const createChatSession = async () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const chat = await model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
    history: [], // Start empty; let API route send actual user prompt
  });

  return chat;
};

module.exports = { createChatSession };
