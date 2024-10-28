"use client"
import { Check, CheckCircle, Minus, Plus, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { GlobalConfig } from '@/app.config'
import Image from 'next/image';
import { GoBackButton } from '@/components/goBackButton';
import Layout from '@/components/layout';
import counter from '@/styles/counter.module.css'

const CustomiseProduct = () => {

    const router = useRouter();

    // const [addons, setAddons] = useState([]);
    const [temp, setTemp] = useState([]);
    const [addonError, setaddonError] = useState(null);

    const searchForRecord = (id) => {
        return temp.find((addon) => addon.id === id);
    }

    const updateTempState = (upr, id) => {
        const recordIndex = temp.findIndex((addon) => addon.id === id);

        setTemp((prevAddons) => {
            const updatedAddons = [...prevAddons];
            updatedAddons[recordIndex] = upr;
            return updatedAddons;
        });
    }

    const changeAddonStatus = async (id, flag) => {
        const record = await searchForRecord(id);
        if (flag == 1) {
            if (record && (record.status == 0 || record.status == 1)) {
                const st = record.status + 1;
                const updatedRecord = { ...record, status: st }
                updateTempState(updatedRecord, id);
            }
        } else {
            if (record && (record.status == 1 || record.status == 2)) {
                const st = record.status - 1;
                const updatedRecord = { ...record, status: st }
                updateTempState(updatedRecord, id);
            }
        }

        // localStorage.setItem('addons', JSON.stringify(addons));
    }

    const initializeTempState = () => {
        const storedData = localStorage.getItem('addons');
        console.log(JSON.parse(storedData));

        if (storedData) {
            setTemp(JSON.parse(storedData));
        }
    };

    const goBack = () => {
        router.back();
    }

    const saveChanges = () => {
        localStorage.setItem('addons', JSON.stringify(temp));
        router.back();
    }

    useEffect(() => {
        initializeTempState();
    }, [])

    return (
        <>
            <Layout>
                <GoBackButton />
                <div className="flex-grow px-2 flex flex-col pt-10 pr-4 pl-6 lg:px-16 lg:pb-24">

                    {temp.map((ad, index) => {
                        return <div key={index} className="flex w-full py-5 md:px-3 lg:px-5 lg:py-4 border-b border-b-gray-200 items-center justify-between">

                            <div className="flex p-0 lg:p-5 justify-center items-center gap-4 lg:gap-2">

                                <div className='flex items-center justify-center'>
                                    <div className={`bg-black h-10 w-10 flex justify-center items-center text-white rounded-full ${ad.status == 0 ? counter.disabledBtn : ''}`}>
                                        <button type="button" data-quantity="minus" data-field="quantity" onClick={() => changeAddonStatus(ad.id, 0)}>
                                            <Minus size={20} />
                                        </button>
                                    </div>

                                    {/* Quantity Status Button */}
                                    <p className="border border-gray-400 px-6 lg:px-8 py-2 rounded-full mx-4 flex items-center font-semibold min-w-32 justify-center" style={{ userSelect: "none" }}>
                                        {ad.status != 1 ? (
                                            ad.status == 0 ? (
                                                "No"
                                            ) : (
                                                "Extra"
                                            )
                                        ) : (
                                            "Regular"
                                        )}
                                    </p>

                                    <div className={`bg-black h-10 w-10 flex justify-center items-center text-white rounded-full ${ad.status == 2 ? counter.disabledBtn : ''}`}>
                                        <button type="button" data-quantity="plus" data-field="quantity" onClick={() => changeAddonStatus(ad.id, 1)}>
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* AddOn Name */}
                                <p className="font-semibold text-base lg:text-b lg:ml-5 uppercase">
                                    {ad.addon_name}
                                    {ad.pivot.has_price == 1 && <span className="text-sm">{' (' + ad.pivot.price + ' for extra)'}</span>}
                                </p>

                            </div>

                            <Image src={GlobalConfig.siteurl + 'storage/' + ad.addon_image} alt="" className="w-12 md:w-14" width={50} height={50} />

                        </div>
                    })}

                </div>

                {/* Actions Buttons */}

                <div className="grid grid-cols-2 justify-center py-6 px-5 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.1)] fixed w-full bottom-0 font-semibold gap-3">
                    <button className="py-4 cursor-pointer rounded-full border border-black" onClick={goBack}>Cancel</button>
                    <button onClick={saveChanges} className="py-4 cursor-pointer rounded-full bg-black text-white flex items-center justify-center gap-1"> <CheckCircle size={18} />Save Changes</button>
                </div>

                {/* <div div className="grid grid-cols-2 justify-center py-4 px-5 bg-white fixed w-full bottom-0 font-semibold text-center">
                    <button onClick={goBack} className="bg-fuchsia-800 text-white px-4 py-3 mx-2 rounded flex items-center justify-center">Cancel
                    </button>

                    <button onClick={saveChanges} className="bg-fuchsia-800 text-white px-4 py-2 mx-2 rounded flex items-center justify-center"
                    >Apply Changes</button>
                </div> */}

                {addonError ? (
                    <div className="fixed px-5 py-10 bg-slate-950 bg-opacity-60 top-0 w-full flex justify-center min-h-screen">
                        <div className="px-5 py-3 bg-red-800 w-fit h-fit text-white capitalize">
                            You have reached the maximum limit
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </Layout>
        </>
    )
}

export default CustomiseProduct