import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    //FaForward,
    //FaBackward,
    //FaExpand,
} from "react-icons/fa";
import { logos } from "../../../../utils/image-exporter";

export const CustomVideoPlayerDash: React.FC<{ src: string }> = ({ src }) => {
    const playerRef = useRef<ReactPlayer>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        if (playerRef.current) {
            playerRef.current.seekTo(newProgress / 100, 'fraction');
        }
        setProgress(newProgress);
    };

    const handleProgressUpdate = ({ played }: { played: number }) => {
        setProgress(played * 100);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSpeed = parseFloat(e.target.value);
        setPlaybackRate(newSpeed);
    };

    return (
        <div className="w-full bg-black">
            <ReactPlayer
                ref={playerRef}
                url={src}
                playing={isPlaying}
                muted={isMuted}
                volume={volume}
                playbackRate={playbackRate}
                onProgress={handleProgressUpdate}
                width={'100%'}
                height={410}
            />
            <div className="bottom-0 left-0 right-0 flex items-center w-full gap-4 px-2 py-4 bottom-e 0 z-100  bg-slate-100/10 controls">
                <div className="px-1 rounded-md">
                    <img src={logos.logo_2} className="w-[5em]" alt="" />
                </div>
                <button onClick={handlePlayPause} className="text-white">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="flex-grow mx-2"
                />
                <div className="flex w-auto">
                    <button onClick={handleMute} className="text-white">
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="ml-2 "
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
            </div>
        </div>
    );
};
