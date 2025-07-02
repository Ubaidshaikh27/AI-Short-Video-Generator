import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    if (!audioFileUrl || typeof audioFileUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid audio file URL" },
        { status: 400 }
      );
    }

    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLY_AI_API_KEY, //captions
    });

    // const audioFile = "./local_file.mp3";
    //   const audioFile = "https://assembly.ai/wildfires.mp3";

    const FILE_URL = audioFileUrl;

    const data = {
      audio: FILE_URL,
      // speech_model: "universal",
    };

    const transcript = await client.transcripts.transcribe(data);

    console.log(transcript.words);

    return NextResponse.json({ result: transcript.words });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Failed to generate captions" },
      { status: 500 }
    );
  }
}
