import { GlobalConfig } from '@/app.config'

export const getDealItems = async () => {
    const res = await fetch(GlobalConfig.siteurl + 'api/get-deals', { next: { revalidate: 3 } });
    if (!res.ok) return undefined;
    return res.json()
}
