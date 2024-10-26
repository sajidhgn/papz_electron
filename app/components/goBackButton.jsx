"use client"
import { useRouter } from 'next/navigation'
import { MoveLeft } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

export const GoBackButton = ({
    title = "Take Me Back",
    onClick,
    background = "bg-transparent",
    textColor = "bg-dark",
    iconInvert = false,
}) => {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.back();
        }
    };

    return (
        <div className={`flex w-100 justify-end px-12 pt-10 ${background} ${textColor}`}>
            <button className="flex items-center" onClick={handleClick}>
                <div className="icon px-1">
                    {/* <MoveLeft size={15} /> */}
                    <Image
                        src={'/assets/images/goBack.svg'}
                        height={20}
                        width={20}
                        alt='Go Back Button'
                        className={iconInvert && 'invert'}
                    />
                </div>
                <div className="font-semibold">{title}</div>
            </button>
        </div>
    )
}
