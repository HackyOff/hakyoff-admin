/* eslint-disable no-dupe-else-if */
import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  //FaForward,
  //FaBackward,
  //FaExpand,
} from "react-icons/fa";
import { logos } from "../../../utils/image-exporter";

const CustomVideoPlayer: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("volumechange", handleVolumeChange);
    }
    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("volumechange", handleVolumeChange);
      }
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = () => {
    const video = videoRef.current;
    if (video) {
      setVolume(video.volume);
      setIsMuted(video.muted);
    }
  };

  const handleVolumeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const video = videoRef.current;
    if (video) {
      video.volume = parseFloat(event.target.value);
      setVolume(video.volume);
      setIsMuted(video.volume === 0);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleProgressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const video = videoRef.current;
    if (video) {
      const newTime = (parseFloat(event.target.value) / 100) * video.duration;
      video.currentTime = newTime;
      setProgress(parseFloat(event.target.value));
    }
  };
  /*
  const handleSkip = (time: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(
        Math.max(0, video.currentTime + time),
        video.duration
      );
    }
  };
*/
  const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const video = videoRef.current;
    const newSpeed = parseFloat(event.target.value);
    if (video) {
      video.playbackRate = newSpeed;
      setPlaybackRate(newSpeed);
    }
  };

  /*
   const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.requestFullscreen) {
       
        video.requestFullscreen();
        // eslint-disable-next-line no-dupe-else-if
      } else if (video.requestFullscreen) {
         
        video.requestFullscreen();
      } else if (video.requestFullscreen) {
         
        video.requestFullscreen();
      }
    }
  };
*/
  return (
    <div className="w-full">
      <video ref={videoRef} src={src} className="w-full" />
      <div className="absolute bottom-0 left-0 right-0 flex items-center w-full gap-4 px-2 py-4 bottom-e 0 z-100 bg-primary/70 controls">
        {/*
 <button onClick={() => handleSkip(-5)} className="text-white">
          <FaBackward />
        </button>
        */}
        <img src={logos.logo_2} className="w-[5em]" alt="" />
        <button onClick={handlePlayPause} className="text-white">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        {/*
  <button onClick={() => handleSkip(5)} className="text-white">
          <FaForward />
        </button>
        */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressInputChange}
          className="flex-grow mx-2 "
        />

        <div className="flex w-auto ">
          <button onClick={handleMute} className="text-white">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeInputChange}
            className="ml-2 z-100"
          />
          <select
            value={playbackRate}
            onChange={handleSpeedChange}
            className="ml-2 text-white bg-gray-700"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
        {/*
<button onClick={handleFullscreen} className="text-white">
          <FaExpand />
        </button>
            */}
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
