import React, { useEffect, useRef } from 'react';

const FriesLottieAnimation = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.36; // Slow down the speed
        }
    }, []);

    const style = {
        height: 150,
    };

    // Use the provided `src` prop or fall back to the default video source
    const videoSource = src || '/assets/animations/fries.webm';

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                style={style}
            >
                <source src={videoSource} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default FriesLottieAnimation;
