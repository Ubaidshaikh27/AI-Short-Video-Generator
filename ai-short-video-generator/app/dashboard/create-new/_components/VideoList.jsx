import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "../../_components/RemotionVideo";
import PlayerDialog from "../../_components/PlayerDialog";

function VideoList({ videoList }) {
  const [openPlayDialog, setOpenPlayDialog] = useState(false);
  const [videoId, setVideoId] = useState();

  if (!Array.isArray(videoList)) return <div>No videos yet.</div>;

  return (
    <div
      className="mt-10 grid grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 "
    >
      {videoList?.map((video, index) => (
        <div
          key={index}
          className="cursor-pointer hover:scale-105 transition-all"
          // onClick={() => {
          //   setOpenPlayDialog(Date.now());
          //   setVideoId(video?.id);
          // }}

          onClick={() => {
            setVideoId(video?.id);
            setOpenPlayDialog(true);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={300}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(v), //not required
            }}
          />
        </div>
      ))}
      {/* <PlayerDialog playVideo={openPlayDialog} videoId={videoId} /> */}
      {openPlayDialog && videoId && (
        <PlayerDialog
          playVideo={true}
          videoId={videoId}
          onClose={() => {
            setOpenPlayDialog(false);
            setVideoId(null);
          }}
        />
      )}
    </div>
  );
}

export default VideoList;
