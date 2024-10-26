import { GlobalConfig } from '@/app.config'

const getMealItems = async () => {
    const res = await fetch(GlobalConfig.siteurl + `api/get-mealitems`);
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
        side: result.side,
        drinks: result.drinks,
    }
}

export default getMealItems