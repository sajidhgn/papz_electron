import { GlobalConfig } from '@/app.config'

export const ProductsByCategory = async (catid, branch) => {

    const data = {
        branch: branch,
    };

    const res = await fetch(GlobalConfig.siteurl + `api/products-by-category/${catid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData || 'An error occurred';
        return {
            status: false,
            message: errorMessage,
        }
    }

    const result = await res.json()
    return {
        status: true,
        product: result,
    }
    // const res = await fetch(GlobalConfig.siteurl + `api/products-by-category/${catid}`, { next: { revalidate: 3 } });
    // if (!res.ok) return undefined;
    // return res.json()
}
