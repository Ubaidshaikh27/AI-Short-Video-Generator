import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // const getDurationFrame = () => {
  //   setDurationInFrame((captions[captions?.length - 1]?.end / 1000) * fps);
  //   return (captions[captions?.length - 1]?.end / 1000) * fps;
  // };

  const durationInFrames = (captions?.[captions.length - 1]?.end / 1000) * fps;

  // ✅ Only set duration ONCE after render
  useEffect(() => {
    if (captions?.length > 0 && fps && setDurationInFrame) {
      setDurationInFrame(durationInFrames);
    }
  }, [captions, fps, setDurationInFrame, durationInFrames]);

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000; // will convert frame number to milliseconds
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );

    return currentCaption ? currentCaption.text : "";
  };

  return (
    script && (
      <AbsoluteFill className="bg-black ">
        {imageList?.map((item, index) => {
          const startTime = (index * durationInFrames) / imageList?.length;

          const duration = durationInFrames;

          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration], //zoom in & zoom out
              index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "center" }
            );

          return (
            <Sequence
              key={index}
              from={startTime}
              durationInFrames={durationInFrames}
            >
              <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h2 className=" text-2xl">{getCurrentCaptions()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          );
        })}
        {audioFileUrl && <Audio src={audioFileUrl} />}
      </AbsoluteFill>
    )
  );
}

export default RemotionVideo;
