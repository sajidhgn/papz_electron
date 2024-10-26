import React, { useEffect, useRef } from 'react';

const VideoAnimation = ({ src, type, height }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.36; // Slow down the speed
        }
    }, []);

    const style = {
        height: height | 150,
    };

    const videoType = type || 'webm';

    return (
        <div>
            <video
                ref={videoRef}
                key={src}
                autoPlay
                loop
                muted
                playsInline
                style={style}
            >
                <source src={src} type={`video/${videoType}`} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoAnimation;
