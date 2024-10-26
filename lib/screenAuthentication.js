import { GlobalConfig } from "@/app.config";
const ScreenAuthentication = async (mac) => {

    const data = {
        mac: mac,
    };

    const res = await fetch(GlobalConfig?.siteurl + 'api/authenticate-screen', {
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
        screen: result.status,
        branch: result.branch,
    }
}
export default ScreenAuthentication