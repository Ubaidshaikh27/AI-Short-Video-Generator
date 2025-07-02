// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import { GoogleGenAI } from "@google/genai";

// async function main() {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });
//   const config = {
//     responseMimeType: "text/plain",
//   };
//   const model = "gemini-2.0-flash";
//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `  Write a script to generate 30 seconds video on topic: interesting history story with AI image prompt with realistic format for each scene and give me result in JSON format and imageprompt and contenttext as a field`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `\`\`\`json
// [
//   {
//     "scene": 1,
//     "duration": 5,
//     "contenttext": "In 1945, a British bomber pilot named Milton Miles crash-landed in the Sahara Desert.",
//     "imageprompt": "A vintage sepia-toned photograph of a 1940s British bomber plane crashed in the vast, desolate Sahara Desert.  The pilot, Milton Miles, is visible near the wreckage, looking disoriented and dusty. The sky is a harsh, unforgiving blue.  Realistic, highly detailed, reminiscent of wartime photography."
//   },
//   {
//     "scene": 2,
//     "duration": 5,
//     "contenttext": "Against all odds, he was rescued by a nomadic Tuareg tribe who offered him food, water, and shelter.",
//     "imageprompt": "A realistic oil painting depicting a weary and dehydrated Milton Miles being offered water by a group of Tuareg nomads in the Sahara. They are dressed in traditional blue robes and headscarves.  Their faces are weathered and kind.  The background shows a traditional Tuareg tent and the undulating dunes of the desert at sunset. Warm, golden lighting."
//   },
//   {
//     "scene": 3,
//     "duration": 5,
//     "contenttext": "Miles stayed with the Tuareg for weeks, learning their customs and way of life, a stark contrast to the war he had left behind.",
//     "imageprompt": "A realistic scene with Milton Miles sitting around a campfire with Tuareg nomads in the Sahara Desert at night. Stars are twinkling in the dark blue sky. Miles is learning to play a Tuareg instrument, with a smile on his face.  Soft, warm lighting from the campfire.  Realistic, detailed portrayal of Tuareg clothing and culture."
//   },
//   {
//     "scene": 4,
//     "duration": 5,
//     "contenttext": "He learned the secret to surviving the harsh desert, a knowledge he would never forget.",
//     "imageprompt": "Close-up, realistic photo of Milton Miles, his face tanned and weathered, learning to find water sources from a Tuareg nomad.  Focus on the details of the desert landscape, showing how to identify signs of water. The nomad points to the ground, explaining the secret. Natural lighting, slightly overexposed to emphasize the desert heat."
//   },
//   {
//     "scene": 5,
//     "duration": 5,
//     "contenttext": "Eventually, Miles was able to return to civilization, forever changed by his experience and grateful to the people who saved him.",
//     "imageprompt": "A realistic scene of Milton Miles, now clean-shaven and wearing his RAF uniform, shaking hands with a Tuareg leader at the edge of the desert. A military vehicle waits in the background.  Both men are smiling slightly, a sense of respect and gratitude between them.  Realistic, detailed portrayal of the transition between desert and civilization.  Clear, bright lighting."
//   },
//   {
//     "scene": 6,
//     "duration": 5,
//     "contenttext": "The unlikely friendship between a British pilot and a nomadic tribe remains a testament to humanity's capacity for kindness in the face of conflict.",
//     "imageprompt": "A slightly stylized, but still realistic, illustration showing a map of the Sahara desert with a connecting line to Great Britain.  Overlayed on the map are symbolic images: a British flag, a Tuareg tent, a compass, and two clasped hands representing friendship and connection.  Warm, inviting color palette.  The style should evoke a sense of adventure and historical significance."
//   }
// ]
// \`\`\`
// `,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];
// }

// main();
