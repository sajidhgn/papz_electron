import React, { useEffect, useState } from 'react'

const OrderStatusSwitch = () => {

    const [activeOrderType, setActiveOrderType] = useState("");
    useEffect(() => {
        let orderType = localStorage.getItem('orderType');
        if (!orderType) {
            orderType = "Eat In";
            localStorage.setItem('orderType', JSON.stringify(orderType));
        }

        setActiveOrderType(orderType);
    }, [])

    const changeStatus = (status) => {
        setActiveOrderType(status);
        localStorage.setItem('orderType', status);
    }

    return (
        <div className="w-full p-5 flex justify-center gap-2">

            {/* Eat In */}
            {activeOrderType === 'Eat In' ? (
                <>
                    <div className="w-40 h-14 cursor-pointer bg-black text-white content-center text-center rounded-full" onClick={() => changeStatus('Eat In')}>
                        Eat In
                    </div>

                    <div className="w-40 h-14 cursor-pointer border border-black content-center text-center rounded-full" onClick={() => changeStatus('Takeaway')}>
                        Takeaway
                    </div>
                </>

            ) : (
                <>
                    <div className="w-40 h-14 cursor-pointer border border-black content-center text-center rounded-full" onClick={() => changeStatus('Eat In')}>
                        Eat In
                    </div>

                    <div className="w-40 h-14 cursor-pointer bg-black text-white content-center text-center rounded-full" onClick={() => changeStatus('Takeaway')}>
                        Takeaway
                    </div>
                </>
            )}

        </div>
    )
}

export default OrderStatusSwitch