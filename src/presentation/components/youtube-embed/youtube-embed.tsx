import React from "react";
import ReactPlayer from "react-player/youtube";

export const YouTubeEmbed: React.FC<{ playing: boolean }> = ({ playing }) => {
  const videoUrl = "https://www.youtube.com/watch?v=shQEXpUwaIY";

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
        background: "#000",
      }}
    >
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        style={{ position: "absolute", top: 0, left: 0 }}
        controls={false}
        config={{
          //youtube: {
          playerVars: {
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            controls: 0,
            disablekb: 1,
            iv_load_policy: 3,
            fs: 0,
            playsinline: 1,
          },
          //},
        }}
      />
    </div>
  );
};
