"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "../_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
import { Users } from "lucide-react";

const scriptData = "a knight in a shining armor"; //-> for testing
const FILE_URL =
  "https://firebasestorage.googleapis.com/v0/b/ai-video-generator-5e513.firebasestorage.app/o/ai-video-generator%2F458612c4-5515-4eff-a81a-b2ec2abbe5d4.mp3?alt=media&token=a20b6738-7188-42ce-93ca-bd54006235b3";

function CreateNew() {
  //-------------- Use States------------------------------------------

  const [formData, setFormData] = useState({
    topic: "",
    imageStyle: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();

  const [imageList, setImageList] = useState();

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const { user } = useUser(); //<---- A Hook from the clerk to get the user Email

  useEffect(() => {
    // ✅ Reset state on component mount (initial page load)
    setPlayVideo(false);
    setVideoId(undefined);
    setVideoData(null);
  }, []);

  //-------------- functions------------------------------------------

  const onHandleInputChange = (fieldname, fieldValue) => {
    console.log(fieldname, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldname]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    if (userDetail?.credits >= 0) {
      toast("You dont have enough Credits 🪙");
      return;
    }
    getVideoScript();
    // GenerateAudioFile();
    // GenerateAudioCaption();
    // GenerateImage();
  };

  //-------------- Generate Video Script------------------------------------------

  const getVideoScript = async () => {
    setLoading(true);

    const prompt =
      "write a script to genrate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI image prompt with " +
      formData.imageStyle +
      " format for each scene and give me results in JSON format and imageprompt and contenttext as a field, do not wrap it in an object, make sure it is an array and give only 1 result with 2 imagePrompt and 1 contentText and contentText should me max 80 characters";
    // " format for each scene and give me results in JSON format and imageprompt and contenttext as a field, do not wrap it in an object, make sure it is an array and make sure there are only 3 results if 30 seconds video, 2 results if 15 second video, and 4 results if 60 second video and in contentText the characters should max 80";

    console.log(prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        // setVideoData((prev) => ({
        //   ...prev,
        //   videoScript: resp.data.result, //<-- extracting array instead of object
        // }));
        console.log(resp.data.result);

        setVideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
      });

    setLoading(false);
  };

  //-------------- Generate Audio------------------------------------------

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();

    if (!videoScriptData) {
      console.log("----> video script data not received");
    }
    console.log("This is script ->>>>>" + videoScriptData);

    videoScriptData.forEach((item) => {
      script = script + item.contentText + " ";
    });

    const res = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });

    console.log("result--->" + res.data.result);

    console.log("  ");
    console.log("🔍 Full audio API response:", res.data);

    // setVideoData((prev) => ({
    //   ...prev,
    //   audioFileUrl: res.data.result,
    // }));
    setAudioFileUrl(res.data.result); //Get file url

    res.data.result &&
      (await GenerateAudioCaption(res.data.result, videoScriptData));
    console.log("script under audio ---> " + script);

    setLoading(false);
  };

  //-------------- Generate Captions------------------------------------------
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    console.log("File URL ---> " + fileUrl);

    setLoading(true);

    const res = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });
    console.log(res.data.result);

    // setVideoData((prev) => ({
    //   ...prev,
    //   captions: res.data.result,
    // }));

    setCaptions(res?.data?.result);
    console.log(res?.data?.result);

    res?.data?.result &&
      (await GenerateImage(videoScriptData, fileUrl, res.data.result));

    setLoading(false);
  };
  //-------------- Generate Image------------------------------------------

  const GenerateImage = async (videoScriptData, audioFile, captionData) => {
    setLoading(true);
    let images = [];
    try {
      const responses = await Promise.all(
        videoScriptData.map(async (element, i) => {
          try {
            const res = await axios.post("/api/generate-image", {
              prompt: element?.imagePrompt,
            });
            console.log(`✅ Image URL ${i + 1}:`, res.data.result);
            images.push(res.data.result);

            return res.data.result;
          } catch (err) {
            console.error(
              `❌ Failed to generate image for prompt #${i + 1}:`,
              element.imagePrompt
            );
            return null;
          }
        })
      );

      // setImageList(images);

      // setVideoData((prev) => ({
      //   ...prev,
      //   imageList: images,
      // }));

      //--------------------------
      // setVideoData((prev) => ({
      //   ...prev,
      //   imageList: responses,
      // }));
      const cleanedImages = responses.filter((img) => !!img);
      const finalData = {
        videoScript: videoScriptData,
        audioFileUrl: audioFile,
        captions: captionData,
        imageList: cleanedImages,
      };
      setVideoData(finalData);

      // console.log(responses, videoScript, audioFileUrl, captions);

      setImageList(cleanedImages);

      await SaveVideoData(finalData); // ✅ saves immediately after everything is ready
    } catch (error) {
      console.error("❌ Unexpected error during batch generation:", error);
      // setImageList(new Array(VIDEOSCRIPT.length).fill(null));
    } finally {
      setLoading(false);
    }
  };

  //-------------- Save data to drizzle ------------------------------------------
  // useEffect(() => {
  //   console.log();
  //   if (Object.keys(videoData).length == 4) {
  //     SaveVideoData(videoData);
  //   }
  // }, [videoData]);

  // useEffect(() => {
  //   const isValid =
  //     videoData && //<<-----	                            Makes sure videoData is not null or undefined
  //     Array.isArray(videoData.videoScript) && //<<---     Checks if videoScript is a valid array
  //     videoData.videoScript.length > 0 && //<-----        Makes sure the array has content
  //     typeof videoData.audioFileUrl === "string" && //<-  Ensures it's a string URL
  //     videoData.audioFileUrl !== "" && //<<----           Makes sure the URL is not empty
  //     Array.isArray(videoData.captions) && //<<---        Confirms captions is an array
  //     videoData.captions.length > 0 && //<<--             Captions array has at least 1 item
  //     Array.isArray(videoData.imageList) && //<<--        Checks imageList is an array
  //     videoData.imageList.length > 0; //<<--             	Image list must have data

  //   if (isValid) {
  //     //<<<<----------- If All Are Valid
  //     const saveData = async () => {
  //       // Wraped it under savedDate because Because useEffect cannot directly handle await, so we define an inner async function and call it.
  //       setLoading(true); // show loading
  //       await SaveVideoData(videoData);
  //       setLoading(false); // hide loading
  //     };

  //     saveData();
  //   }

  // if (!isValid) {
  //   console.warn("Invalid data. Skipping save.");
  //   return;
  // }
  // }, [videoData]); //<<---------                         This code runs every time the videoData state changes.

  const SaveVideoData = async (videoData) => {
    try {
      const result = await db
        .insert(VideoData)
        .values({
          script: JSON.stringify(videoData?.videoScript), // must be stringified JSON
          audioFileUrl: String(videoData?.audioFileUrl), // ✅ Ensure it's string
          captions: JSON.stringify(videoData?.captions), // ✅ JSON as string
          imageList: videoData?.imageList,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ id: VideoData?.id });

      await UpdateUserCredits();

      const newId = result[0]?.id;
      console.log("Saved video ID before:", result[0]);

      setVideoId(newId);
      console.log("Saved video ID after:", newId);
      setPlayVideo(true);

      console.log("📥 Saved to DB:", result);
    } catch (err) {
      console.error(" DB Save Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  //-------------- Updating Credits------------------------------------------

  const UpdateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits - 10,
      })
      .where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setUserDetail((prev) => ({
      ...prev,
      credits: userDetail?.credits - 10,
    }));

    setVideoData(null);
  };

  //-------------- Components------------------------------------------

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}

        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} />
      {/* <PlayerDialog playVideo={playVideo} videoId={videoId} /> */}
      {playVideo && videoId && (
        <PlayerDialog
          playVideo={true}
          videoId={videoId}
          onClose={() => setPlayVideo(false)}
        /> //This ensures PlayerDialog is only mounted (and thus auto-opens) after a video is created, preventing premature openings.
      )}
    </div>
  );
}

export default CreateNew;
