import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId, onClose }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    // setOpenDialog(!openDialog); <--- this was giving issue of dialog opeing automaticalyy
    setOpenDialog(true);

    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const idValue =
      typeof videoId === "object" && videoId?.id ? videoId.id : videoId;

    if (!idValue || typeof idValue !== "number") {
      console.warn("Invalid videoId for query:", videoId);
      return;
    }

    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, idValue));

    console.log(result);
    setVideoData(result[0]);
    console.log("Loaded video data:", result[0]);
  };

  return (
    // <Dialog open={openDialog}>
    <Dialog
      open={openDialog}
      onOpenChange={(isOpen) => {
        setOpenDialog(isOpen);
        if (!isOpen) onClose?.(); // ✅ Ensures parent is notified when modal closes
      }}
    >
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready.
          </DialogTitle>
          <DialogDescription></DialogDescription>

          <div>
            {/* Videoplayer */}
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrame.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationInFrame: (frameValue) =>
                  setDurationInFrame(frameValue),
              }}
            />
            <div className="flex gap-10">
              <Button
                variant="ghost"
                onClick={() => {
                  router.replace("/dashboard");
                  setOpenDialog(false);
                  onClose?.(); // ✅ tell parent to stop rendering PlayerDialog
                }}
              >
                Cancel
              </Button>
              {/* export not yet set up as it needs a google cloud billing */}
              <Button>Export</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
