import React, { cache } from 'react'
import { GlobalConfig } from '@/app.config'

export const getAllProducts = async () => {
    const res = await fetch(GlobalConfig.siteurl + `api/all-products`, { next: { revalidate: 3 } });
    if (!res.ok) return undefined
    return res.json()
}
