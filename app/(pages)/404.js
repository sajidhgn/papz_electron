import { GoBackButton } from '../components/goBackButton'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Custom404 = () => {
    const router = useRouter()
    return (
        <>
            <GoBackButton />
            <div class="lg:px-24 lg:pb-24 lg:pt-0 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div class="relative">
                        <div class="absolute">
                            <div class="">
                                <h1 class="my-2 text-gray-800 font-bold text-2xl">
                                    Looks like you have found the
                                    doorway to the great nothing
                                </h1>
                                <p class="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                                <button class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50" onClick={() => { router.push('/category') }}>Take me there!</button>
                            </div>
                        </div>
                        <div>
                            <Image src={'https://i.ibb.co/G9DC8S0/404-2.png'} width={100} height={100} alt='Take Me There Image' />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
                </div>
            </div>
        </>
    )
}

export default Custom404