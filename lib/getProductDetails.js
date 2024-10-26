import { GlobalConfig } from '@/app.config'

export const getProductDetails = async (pid) => {
    const res = await fetch(GlobalConfig.siteurl + `api/get-product/${pid}`, { next: { revalidate: 3 } });
    if (!res.ok) return undefined
    return res.json()
}
