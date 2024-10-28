import { useEffect, useState } from 'react';
import { GlobalConfig } from '@/app.config'
import { PoundSterling } from 'lucide-react'
import Image from 'next/image'


const MealModal = (props) => {

    const [mealItems, setMealItems] = useState([]);
    useEffect(() => {
        setMealItems(props.data);
    }, [])

    return (
        <>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="bg-white my-20 max-w-3xl rounded-lg">
                            <div className="flex flex-col h-[60vh] overflow-hidden py-6">

                                <div className="flex-grow overflow-y-auto px-6 py-6">
                                    <div className="grid md:grid-cols-3 gap-10">
                                        {mealItems.map((product, index) => (
                                            <div className="flex flex-col gap-2 cursor-pointer items-center" onClick={() => props.addItem(product.id, product.products_status, product.product_image, product.product_name, product.meal_price)} key={index} >

                                                <Image src={GlobalConfig.siteurl + 'storage/' + product.product_image} className="w-28 lg:w-32 object-contain aspect-square" alt={product.product_name + " Image"}
                                                    width={10}
                                                    height={10}
                                                />

                                                <div className="flex flex-col items-center gap-1">
                                                    <p className="text-md lg:text-xl leading-none">
                                                        {product.product_name}
                                                    </p>

                                                    <p className="font-semibold">
                                                        {product.meal_price}
                                                    </p>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex-shrink-0 border-t border-t-gray-300 w-full  px-6">
                                    <button className="bg-black text-white px-20 py-3 lg:py-4" onClick={props.closeModal}>Cancel</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default MealModal