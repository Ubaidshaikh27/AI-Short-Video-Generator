import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Received prompt --------> ", prompt);

    console.log(" PROMPT workng");

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const model =
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe";

    // const output = await replicate.run(model, { input, wait: true });

    const prediction = await replicate.predictions.create({
      version:
        "6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe", // your model version
      input,
      wait: true, // <- IMPORTANT
    });

    console.log(" MODEL workng");

    // const imageUrl = output?.[0];
    const imageUrl = prediction.output?.[0];

    console.log("Generated image URL:", imageUrl);

    //Save to firebase
    const base64Image =
      "data:image/png;base64," + (await ConvertImage(imageUrl));
    const fileName = "ai-video-generator/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, "data_url");

    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);

    // return NextResponse.json({ result: imageUrl });

    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

const ConvertImage = async (imageLink) => {
  try {
    const response = await axios.get(imageLink, {
      responseType: "arraybuffer",
    });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (error) {
    console.log("Error: " + error);
  }
};
