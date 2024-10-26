import { GlobalConfig } from '@/app.config'

const getOrders = async () => {
    const res = await fetch(GlobalConfig.siteurl + `api/get-orders`);
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
        data: result.orders,
    }
}

export default getOrders