import React from 'react'

const OrderCard = () => {
    return (
        <>
            <div className="flex flex-col rounded-lg border overflow-hidden w-full">

                {/* TOP SECTION */}
                <div className="flex flex-col bg-slate-200 p-4">
                    {/* Order No */}
                    <div className="flex w-full">
                        <div className="w-3/4 text-xl font-semibold">Order No</div>
                        <div className="w-1/4 text-end text-xl font-semibold">001</div>
                    </div>
                    {/* Time */}
                    <div>18-10-2023 08:35 am</div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="flex flex-col p-4">
                    {/* Ordered Product */}
                    <div className="flex flex-col my-1">
                        {/* Product Title */}
                        <div className="flex justify-between px-2 font-semibold text-base">
                            <div className='w-4/5'>Beef Burger</div>
                            <div>1x</div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 bg-fuchsia-800 rounded text-white text-xs w-full">
                            pending....
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default OrderCard