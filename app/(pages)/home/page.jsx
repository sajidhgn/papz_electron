"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Index = () => {
    const [isAdVisible, setIsAdVisible] = useState(false);
    const [apiUrlInput, setApiUrlInput] = useState("");
    const [apiUrlInputs, setApiUrlInputs] = useState("");
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

    const checkMachineConnectionWithAxios= async ()=>{
            try {
              const response = await axios.get(apiUrlInput, {
                auth: {
                  username: 'eatstek_admin',
                  password: 'chpshpmngr',
                },
              });
          
              console.log('Axios Response:', response.data); // Log response to the console
            } catch (error) {
              console.error('Error fetching device info with Axios:', error);
            }
    }

   const checkMachineConnectionWithFetch = async () => {
        try {
          const response = await fetch(apiUrlInputs, {
            headers: {
              'Authorization': 'Basic ' + btoa('eatstek_admin:chpshpmngr'),
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Fetch Response:', data); // Log response to the console
      
        
        } catch (error) {
          console.error('Error fetching device info with Fetch:', error);
        }
      }

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
                <div>
                    <div className='flex gap-3 items-center'>
                        <h2>AXIOS</h2>
                    <input type='text' className='h-[40px] border border-gray-600 px-2'  value={apiUrlInput} onChange={(e) => setApiUrlInput(e.target.value)} placeholder="Enter api"/>
                    <button onClick={checkMachineConnectionWithAxios} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'>Submit</button>
               </div>
               <div className='flex gap-3 items-center mt-3'>
                        <h2>FETCH</h2>
                    <input type='text' className='h-[40px] border border-gray-600 px-2'  value={apiUrlInputs} onChange={(e) => setApiUrlInputs(e.target.value)} placeholder="Enter api"/>
                    <button onClick={checkMachineConnectionWithFetch} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4'>Submit</button>
               </div>
                {/* <div
                    className="bg-black text-white h-36 w-36 text-xl rounded-full flex items-center justify-center cursor-pointer"
                    onClick={checkMachineConnection} // Navigate to /category on click
                >
                    <p>Start Order</p>
                </div> */}
                </div>
            )}
        </div>
    );
};

export default Index;
