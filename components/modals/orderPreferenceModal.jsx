import { useEffect, useState } from 'react';
import { GlobalConfig } from '@/app.config'
import { PoundSterling } from 'lucide-react'
import Image from 'next/image'


const PerferenceModal = (props) => {

    // useEffect(() => {
    //     setMealItems(props.data);
    // }, [])

    return (
        <>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="bg-white my-20 max-w-3xl rounded-lg">
                            <div className="flex flex-col h-[60vh] overflow-hidden py-6">

                                <div className="flex-grow overflow-y-auto px-6 py-6">
                                    <div className="grid md:grid-cols-3 gap-10">
                                        Hello G
                                    </div>
                                </div>

                                <div className="pt-4 flex-shrink-0 border-t border-t-gray-300 w-full  px-6">
                                    <button className="bg-black text-white px-20 py-3 lg:py-4">Cancel</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default PerferenceModal