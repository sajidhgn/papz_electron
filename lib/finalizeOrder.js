import React from 'react'
import { GlobalConfig } from '@/app.config'
// import getCsrfToken from './getCsrfToken';

const finalizeOrder = async (cart, macAddress, totalBill, payMethod, payStatus, orderType) => {

    const data = {
        cart: cart, //It is an array
        macAddress: macAddress,
        totalBill: totalBill,
        payMethod: payMethod,
        payStatus: payStatus,
        orderType: orderType,
    };

    const res = await fetch(GlobalConfig.siteurl + 'api/finalizeOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message || 'An error occurred';
        return {
            status: false,
            message: errorMessage,
        }
    }

    const result = await res.json()
    return {
        status: true,
        orderNo: result.order_no,
        message: result.message,
    }
}

export default finalizeOrder