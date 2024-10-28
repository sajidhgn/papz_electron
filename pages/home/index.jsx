import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
    const [isAdVisible, setIsAdVisible] = useState(false);
    const router = useRouter();
    const timerRef = useRef(null);

    const resetTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsAdVisible(true);
        }, 20000);
    };

    const handleUserClick = () => {
        if (isAdVisible) {
            setIsAdVisible(false);
        }
        resetTimer();
    };

    useEffect(() => {
        resetTimer();
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <div
            className="flex min-h-screen p-5 justify-center items-center gap-4"
            onClick={handleUserClick} // Handle click event to reset the timer and hide the ad
        >
            {isAdVisible ? (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
                    <div className="relative w-full h-full">
                        {/* Fullscreen video */}
                        <video
                            src="/assets/dummyAd.mp4" // Replace with your video path
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                        />

                        {/* Bottom text with black background */}
                        <div className="absolute bottom-10 text-center p-4 flex justify-center w-full">
                            <p className="text-white text-xl bg-black bg-opacity-80 px-10 py-4">Click anywhere to start your order</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="bg-black text-white h-36 w-36 text-xl rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => router.push('/category')} // Navigate to /category on click
                >
                    <p>Start Order</p>
                </div>
            )}
        </div>
    );
};

export default Index;
