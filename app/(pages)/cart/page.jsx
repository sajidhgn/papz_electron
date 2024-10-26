"use client"
import React, { useEffect, useState } from 'react'
import counter from '@/styles/counter.module.css'
import { Check, Minus, Plus, PlusCircle, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GoBackButton } from '../../components/goBackButton';

import Layout from '../../components/layout';
import Image from 'next/image';

const CartPage = () => {

    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [mealCart, setMealCart] = useState([]);
    const [dealsCart, setDealsCart] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [mealCartTotalBill, setMealCartTotalBill] = useState(0);
    const [singleItemTotalBill, setSingleItemTotalBill] = useState(0);
    const [dealCartTotalBill, setDealCartTotalBill] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));

        const customMeal = JSON.parse(localStorage.getItem('mealCart'));
        const deals = JSON.parse(localStorage.getItem('dealsCart'));

        if (cartItems) {
            setCart(cartItems);
            updateBill(cartItems, 'single');
        }

        if (customMeal) {
            setMealCart(customMeal);
            updateBill(customMeal, 'meal');
        }

        if (deals) {
            setDealsCart(deals);
            updateBill(deals, 'deal');
        }

    }, [])

    useEffect(() => {
        setTotalBill(singleItemTotalBill + mealCartTotalBill + dealCartTotalBill);
    }, [singleItemTotalBill, mealCartTotalBill, dealCartTotalBill])


    const updateBill = (cartItems, cartFlag) => {
        let total = 0;
        let cartCount = 0;
        for (let index = 0; index < cartItems.length; index++) {
            const element = cartItems[index];
            total += parseFloat(element.tprice);
            cartCount += parseInt(element.quantity);
        }

        if (cartFlag === 'single') {
            setSingleItemTotalBill(total);
        } else if (cartFlag === 'meal') {
            setMealCartTotalBill(total);
        } else if (cartFlag === 'deal') {
            setDealCartTotalBill(total);
        }



        // setTotalBill(singleItemTotalBill + mealCartTotalBill);
    }

    useEffect(() => {
        localStorage.setItem('totalBill', JSON.stringify(totalBill));
    }, [totalBill])


    const quantityOnChange = (e, id, flag) => {
        const value = e.target.value;

        if (flag == 'single') {
            const updatedCart = cart.map(item => {
                if (item.id === id && value >= 1) {
                    const newQuantity = value;
                    const newPrice = newQuantity * item.sprice;
                    return { ...item, quantity: newQuantity, tprice: newPrice };
                }
                return item;
            });

            setCart(updatedCart);
            updateBill(updatedCart, 'single');
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else if (flag == 'meal') {
            const updatedCart = mealCart.map(item => {
                if (item.id === id && value >= 1) {
                    const newQuantity = value;
                    const newPrice = newQuantity * item.sprice;
                    return { ...item, quantity: newQuantity, tprice: newPrice };
                }
                return item;
            });

            setMealCart(updatedCart);
            updateBill(updatedCart, 'meal');
            localStorage.setItem('mealCart', JSON.stringify(updatedCart));
        } else if (flag == 'deal') {
            const updatedCart = dealsCart.map(item => {
                if (item.id === id && value >= 1) {
                    const newQuantity = value;
                    const newPrice = newQuantity * item.sprice;
                    return { ...item, quantity: newQuantity, tprice: newPrice };
                }
                return item;
            });

            setDealsCart(updatedCart);
            updateBill(updatedCart, 'deal');
            localStorage.setItem('dealsCart', JSON.stringify(updatedCart));
        }
    }

    const changeQuantity = (id, flag, itemCategory) => {
        if (itemCategory == 'single') {
            const updatedCart = cart.map(item => {
                if (item.id === id && (flag === 0 ? item.quantity > 1 : true)) {
                    const newQuantity = flag === 0 ? item.quantity - 1 : parseInt(item.quantity + 1);
                    const newPrice = newQuantity * item.sprice;
                    return { ...item, quantity: newQuantity, tprice: newPrice };
                }
                return item;
            });

            setCart(updatedCart);
            updateBill(updatedCart, 'single');
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else if (itemCategory == 'meal') {
            const updatedCart = mealCart.map(item => {
                if (item.id === id && (flag === 0 ? item.quantity > 1 : true)) {
                    const newQuantity = flag === 0 ? item.quantity - 1 : parseInt(item.quantity + 1);
                    const newPrice = newQuantity * item.sprice;
                    return { ...item, quantity: newQuantity, tprice: newPrice };
                }
                return item;
            });

            setMealCart(updatedCart);
            updateBill(updatedCart, 'meal');
            localStorage.setItem('mealCart', JSON.stringify(updatedCart));
        } else if (itemCategory == 'deal') {
            const updatedCart = dealsCart.map(item => {
                if (item.id === id && (flag === 0 ? item.quantity > 1 : true)) {
                    const newQuantity = flag === 0 ? item.quantity - 1 : parseInt(item.quantity + 1);
                    const newPrice = newQuantity * item.sprice;
                    return { ...item, quantity: newQuantity, tprice: newPrice };
                }
                return item;
            });

            setDealsCart(updatedCart);
            updateBill(updatedCart, 'deal');
            localStorage.setItem('dealsCart', JSON.stringify(updatedCart));
        }
    }

    const removeEntry = (id, flag) => {
        if (flag == 'single') {
            const updatedCart = cart.filter(item => item.id !== id);
            setCart(updatedCart);
            updateBill(updatedCart, 'single');
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else if (flag == 'meal') {
            const updatedCart = mealCart.filter(item => item.id !== id);
            setMealCart(updatedCart);
            updateBill(updatedCart, 'meal');
            localStorage.setItem('mealCart', JSON.stringify(updatedCart));
        } else if (flag == 'deal') {
            const updatedCart = dealsCart.filter(item => item.id !== id);
            setDealsCart(updatedCart);
            updateBill(updatedCart, 'deal');
            localStorage.setItem('dealsCart', JSON.stringify(updatedCart));
        }
    }

    return (
        <>
            <Layout>
                <div className="main-container min-h-screen">
                    <GoBackButton />

                    <div className="px-2 flex flex-col flex-1 pt-10 pr-4 pl-6 lg:px-16 pb-32 lg:pb-40">

                        {/* Heading */}
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold uppercase">Your Products</div>
                            <div className="text-xl font-semibold uppercase">Total : {totalBill.toFixed(2)}</div>
                        </div>

                        {/* Main Card */}
                        {cart.length == 0 && mealCart.length == 0 && dealsCart.length == 0 ? (
                            <div className='w-100 pt-20 flex flex-col items-center justify-center'>
                                <div className="text-4xl font-medium">OOPPSS</div>
                                <div className='italic'>You do not have any items in the list</div>
                            </div>
                        ) : (
                            <>
                                {/* Single Item Display */}
                                {cart.slice().reverse().map((ct, index) => {
                                    return <div key={index} className="w-full py-2 lg:py-4 px-5 lg:px-8 my-2 bg-white rounded shadow-sm">

                                        {/* Name and Price */}
                                        <div className="w-full flex items-center justify-between pt-3">
                                            <div className="flex flex-col">
                                                <div className='font-semibold'><span className="px-3 py-2 rounded-md lowercase font-bold">{ct.quantity}x</span> {ct.quantity > 1 ? (ct.product_name + 's') + '(' + ct.selectedSize.size + ')' : (ct.product_name) + '(' + ct.selectedSize.size + ')'} - {parseFloat(ct.tprice).toFixed(2)}</div>
                                            </div>
                                            <div className="mt-auto font-semibold bg-red-200 p-2 rounded-full cursor-pointer" onClick={() => { removeEntry(ct.id, 'single') }}><Image src={"/assets/images/trash.svg"} width={25} height={25} className="text-lg" alt='Delete Icon' /></div>
                                            {/* <div className="mt-auto font-semibold">£ {parseFloat(ct.tprice).toFixed(2)}</div> */}
                                        </div>

                                        {/* Choices */}
                                        {ct.choices != null && ct.choices.length > 0 && (
                                            <div className="flex flex-col gap-4 pb-4 border-b border-b-gray-300">
                                                <div className="flex w-full items-center justify-center gap-3">
                                                    <div className=" w-32 border-b border-b-gray-400"></div>
                                                    <p className="text-xl font-semibold rounded-full text-center w-fit">Selected Options</p>
                                                    <div className=" w-32 border-b border-b-gray-400"></div>
                                                </div>
                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {ct.choices.map((choice, index) => {
                                                        return <div className="flex gap-1" key={index}>
                                                            <Check size={16} />
                                                            <p className="font-semibold">{choice.choice_name} : </p>
                                                            {choice.choice_options
                                                                .filter(option => option.status === 1)
                                                                .map((option, key) => (
                                                                    <p key={key}>{option.option_name}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    })}
                                                </div>
                                            </div>

                                            // <div className="w-full grid grid-cols-1 lg:grid-col-2 border-b border-b-gray-200 py-2 mb-2">
                                            //     <div className="grid grid-cols-2 font-semibold">
                                            //         {ct.main.addons.map((addon, index) => {
                                            //             return addon.status != 1 && (
                                            //                 addon.status === 0 ? (
                                            //                     <div key={index} className='flex items-center gap-1'> <Check size={16} /> No {addon.addon_name}</div>
                                            //                 ) : (
                                            //                     <div key={index} className='flex items-center gap-1'><Check size={16} /> Extra {addon.addon_name}</div>
                                            //                 )
                                            //             )
                                            //         })}
                                            //     </div>
                                            // </div>
                                        )}

                                        {/* Addons */}
                                        {ct.addons != null && ct.addons.some(addon => addon.status !== 1) && (
                                            <div className="w-full grid grid-cols-1 lg:grid-col-2 border-b border-b-gray-200 py-4">
                                                <div className="grid grid-cols-2 font-semibold">
                                                    {ct.addons.map((addon, index) => {
                                                        return addon.status != 1 ? (
                                                            addon.status === 0 ? (
                                                                <div key={index} className='flex items-center gap-1'> <Check size={16} /> No {addon.addon_name}</div>
                                                            ) : (
                                                                <div key={index} className='flex items-center gap-1'><Check size={16} />
                                                                    Extra {addon.addon_name}
                                                                </div>
                                                            )
                                                        ) : (
                                                            ""
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Product Actions */}
                                        <div className="w-full flex justify-center py-4">
                                            {/* <button className="lg:mx-5 px-4 py-2 lg:px-8 lg:py-3 bg-red-700 text-white rounded-md" onClick={() => { removeEntry(ct.id, 'single') }}>Remove</button> */}

                                            <div className={`input-group ${counter.plusMinusInput} flex justify-center gap-3`}>
                                                <div className="input-group-button text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" className='bg-black h-8 w-8 rounded-full flex items-center justify-center' data-quantity="minus" data-field="quantity" onClick={() => changeQuantity(ct.id, 0, 'single')}>
                                                        <Minus size={15} />
                                                    </button>
                                                </div>

                                                <input
                                                    className={`${counter.inputGroupField}  text-center py-2 border border-gray-300 w-1/4 rounded-full`}
                                                    type="number"
                                                    name="quantity"
                                                    value={ct.quantity}
                                                    onChange={(e) => quantityOnChange(e, ct.id, 'single')}
                                                />

                                                <div className="input-group-button text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" data-quantity="plus" data-field="quantity" className='bg-black h-8 w-8 rounded-full flex items-center justify-center' onClick={() => changeQuantity(ct.id, 1, 'single')}>
                                                        <Plus size={15} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* <a href="/addons.html"
                                                className="lg:mx-5 px-4 py-2 lg:px-8 lg:py-3 bg-green-600 text-white rounded-md" >
                                                Edit
                                            </a> */}
                                        </div>
                                    </div>
                                })}

                                {/* Custom Meals Item Display */}
                                {mealCart.length > 0 && <div className="text-xl font-semibold italic uppercase mt-4">Meals</div>}
                                {mealCart.slice().reverse().map((ct, index) => {
                                    return <div key={index} className="w-full py-2 lg:py-4 px-5 lg:px-8 my-2 bg-white rounded shadow-sm">

                                        {/* Name and Price */}
                                        <div className="w-full flex items-center justify-between pt-3">
                                            <div className="flex flex-col">
                                                <div className='font-semibold'><span className="px-3 py-2 rounded-md lowercase font-bold">{ct.quantity}x</span> {ct.quantity > 1 ? (ct.main.name + 's' + '(' + ct.main.selectedSize.size + ')') : (ct.main.name) + '(' + ct.main.selectedSize.size + ')'} - {parseFloat(ct.tprice).toFixed(2)}</div>
                                            </div>
                                            <div className="mt-auto font-semibold bg-red-200 p-2 rounded-full cursor-pointer" onClick={() => { removeEntry(ct.id, 'meal') }}><Image src={"/assets/images/trash.svg"} width={25} height={25} className="text-lg" /></div>
                                        </div>

                                        {/* Choice Options */}
                                        {ct.main.choices != null && ct.main.choices.length > null && (
                                            <div className="flex flex-col gap-4 pb-4 border-b border-b-gray-300">
                                                <div className="flex w-full items-center justify-center gap-3">
                                                    <div className=" w-32 border-b border-b-gray-400"></div>
                                                    <p className="text-xl font-semibold rounded-full text-center w-fit">Selected Options</p>
                                                    <div className=" w-32 border-b border-b-gray-400"></div>
                                                </div>
                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {ct.main.choices.map((choice, index) => {
                                                        return <div className="flex gap-1" key={index}>
                                                            <Check size={16} />
                                                            <p className="font-semibold">{choice.choice_name} : </p>
                                                            {choice.choice_options
                                                                .filter(option => option.status === 1)
                                                                .map((option, key) => (
                                                                    <p key={key}>{option.option_name}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    })}
                                                </div>
                                            </div>

                                            // <div className="w-full grid grid-cols-1 lg:grid-col-2 border-b border-b-gray-200 py-2 mb-2">
                                            //     <div className="grid grid-cols-2 font-semibold">
                                            //         {ct.main.addons.map((addon, index) => {
                                            //             return addon.status != 1 && (
                                            //                 addon.status === 0 ? (
                                            //                     <div key={index} className='flex items-center gap-1'> <Check size={16} /> No {addon.addon_name}</div>
                                            //                 ) : (
                                            //                     <div key={index} className='flex items-center gap-1'><Check size={16} /> Extra {addon.addon_name}</div>
                                            //                 )
                                            //             )
                                            //         })}
                                            //     </div>
                                            // </div>
                                        )}

                                        {/* Addons */}
                                        {ct.main.addons != null && ct.main.addons.some(addon => addon.status !== 1) && (
                                            <div className="w-full grid grid-cols-1 lg:grid-col-2 py-2 border-b border-b-gray-200">
                                                <div className="grid grid-cols-2 font-semibold">
                                                    {ct.main.addons.map((addon, index) => {
                                                        return addon.status != 1 && (
                                                            addon.status === 0 ? (
                                                                <div key={index} className='flex items-center gap-1'> <Check size={16} /> No {addon.addon_name}</div>
                                                            ) : (
                                                                <div key={index} className='flex items-center gap-1'><Check size={16} /> Extra {addon.addon_name}</div>
                                                            )
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Side & Drink */}
                                        <div className="w-full grid grid-cols-1 lg:grid-col-2 py-2 mt-2">
                                            <div className="grid grid-cols-2">
                                                <div className="font-semibold"><span className="">Side Item : </span><span className="px-1 bg-black text-white">{ct.side.name}</span></div>

                                                <div className="font-semibold"><span className="">Drink : </span><span className="px-1 bg-black text-white">{ct.drink.name}</span></div>
                                            </div>
                                        </div>

                                        {/* Product Actions */}
                                        <div className="w-full flex justify-center py-4">
                                            <div className={`input-group ${counter.plusMinusInput} flex justify-center gap-3`}>
                                                <div className="input-group-button text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" className='bg-black h-8 w-8 rounded-full flex items-center justify-center' data-quantity="minus" data-field="quantity" onClick={() => changeQuantity(ct.id, 0, 'meal')}>
                                                        <Minus size={15} />
                                                    </button>
                                                </div>

                                                <input
                                                    className={`${counter.inputGroupField}  text-center py-2 border border-gray-300 w-1/4 rounded-full`}
                                                    type="number"
                                                    name="quantity"
                                                    value={ct.quantity}
                                                    onChange={(e) => quantityOnChange(e, ct.id, 'meal')}
                                                />

                                                <div className="input-group-button text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" data-quantity="plus" data-field="quantity" className='bg-black h-8 w-8 rounded-full flex items-center justify-center' onClick={() => changeQuantity(ct.id, 1, 'meal')}>
                                                        <Plus size={15} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* <div className={`input-group ${counter.plusMinusInput} flex justify-center`}>
                                                <div className="input-group-button bg-fuchsia-800 px-3 py-0 text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" data-quantity="minus" data-field="quantity" onClick={() => changeQuantity(ct.id, 0, 'meal')}>
                                                        <Minus size={15} />
                                                    </button>
                                                </div>

                                                <input
                                                    className={`${counter.inputGroupField}  text-center py-2 border border-gray-300 w-1/4`}
                                                    type="number"
                                                    name="quantity"
                                                    value={ct.quantity}
                                                    onChange={(e) => quantityOnChange(e, ct.id, 'meal')}
                                                />

                                                <div className="input-group-button bg-fuchsia-800 px-3 py-0 text-sm lg:text-sm flex items-center rounded-tr-md rounded-br-md text-white">
                                                    <button type="button" data-quantity="plus" data-field="quantity" onClick={() => changeQuantity(ct.id, 1, 'meal')}>
                                                        <Plus size={15} />
                                                    </button>
                                                </div>
                                            </div> */}

                                            {/* <a href="/addons.html"
                                                className="lg:mx-5 px-4 py-2 lg:px-8 lg:py-3 bg-green-600 text-white rounded-md" >
                                                Edit
                                            </a> */}
                                        </div>

                                    </div>
                                })}

                                {/* Deals Item Display */}
                                {dealsCart.length > 0 && <div className="text-xl font-semibold italic uppercase mt-4">Deals</div>}
                                {dealsCart.slice().reverse().map((ct, index) => {
                                    return <div key={index} className="w-full py-2 lg:py-4 px-5 lg:px-8 my-2 bg-white rounded shadow-sm">

                                        {/* Name and Price */}
                                        <div className="w-full flex items-center justify-between pt-4">
                                            <div className="flex flex-col">
                                                <div className='font-semibold'><span className="px-3 py-2 rounded-md lowercase font-bold">{ct.quantity}x</span> {ct.quantity > 1 ? (ct.name + 's') : (ct.name)} - {parseFloat(ct.tprice).toFixed(2)}</div>
                                            </div>
                                            <div className="mt-auto font-semibold bg-red-200 p-2 rounded-full cursor-pointer" onClick={() => { removeEntry(ct.id, 'deal') }}><Image src={"/assets/images/trash.svg"} width={25} height={25} className="text-lg" /></div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            {ct.singleItems && (
                                                ct.singleItems.map((item, itemIndex) => (
                                                    <div className="flex items-center gap-1" key={itemIndex}>
                                                        -
                                                        <div className="font-semibold flex items-center">
                                                            {item.quantity} x
                                                        </div>
                                                        <div>{item.size.size_name}</div>
                                                        <div>{item.product.product_name}</div>
                                                    </div>
                                                ))
                                            )}

                                        </div>

                                        {/* Products Display */}
                                        <div className="w-full grid grid-cols-1 gap-y-10">
                                            {ct.selectedProducts?.map((cat, index) => (
                                                <div key={index} className="flex flex-col gap-3">

                                                    <div className="flex w-full items-center justify-center gap-3">
                                                        <div className=" w-32 border-b border-b-gray-400"></div>
                                                        <p className="text-xl font-semibold rounded-full text-center w-fit">{cat.category_name}</p>
                                                        <div className=" w-32 border-b border-b-gray-400"></div>
                                                    </div>

                                                    {cat.selected_products?.map((product, productIndex) => (
                                                        <div key={productIndex}>
                                                            <div className='text-xl'>- {product.product_name}</div>
                                                            <div className="grid grid-cols-2 gap-y-0">
                                                                {product.choice_options?.map((choice, choiceIndex) => (
                                                                    <p key={choiceIndex} className='flex items-center gap-1 px-4'>
                                                                        <Check size={13} /><span className="font-semibold">{choice.choice_name}</span> : {choice.option_name}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>


                                        {/* Product Actions */}
                                        <div className="w-full flex justify-center py-4">
                                            <div className={`input-group ${counter.plusMinusInput} flex justify-center gap-3`}>
                                                <div className="input-group-button text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" className='bg-black h-8 w-8 rounded-full flex items-center justify-center' data-quantity="minus" data-field="quantity" onClick={() => changeQuantity(ct.id, 0, 'deal')}>
                                                        <Minus size={15} />
                                                    </button>
                                                </div>

                                                <input
                                                    className={`${counter.inputGroupField}  text-center py-2 border border-gray-300 w-1/4 rounded-full`}
                                                    type="number"
                                                    name="quantity"
                                                    value={ct.quantity}
                                                    onChange={(e) => quantityOnChange(e, ct.id, 'deal')}
                                                />

                                                <div className="input-group-button text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" data-quantity="plus" data-field="quantity" className='bg-black h-8 w-8 rounded-full flex items-center justify-center' onClick={() => changeQuantity(ct.id, 1, 'deal')}>
                                                        <Plus size={15} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* <div className={`input-group ${counter.plusMinusInput} flex justify-center`}>
                                                <div className="input-group-button bg-fuchsia-800 px-3 py-0 text-sm lg:text-sm flex items-center rounded-tl-md rounded-bl-md text-white">
                                                    <button type="button" data-quantity="minus" data-field="quantity" onClick={() => changeQuantity(ct.id, 0, 'deal')}>
                                                        <Minus size={15} />
                                                    </button>
                                                </div>

                                                <input
                                                    className={`${counter.inputGroupField}  text-center py-2 border border-gray-300 w-1/4`}
                                                    type="number"
                                                    name="quantity"
                                                    value={ct.quantity}
                                                    onChange={(e) => quantityOnChange(e, ct.id, 'deal')}
                                                />

                                                <div className="input-group-button bg-fuchsia-800 px-3 py-0 text-sm lg:text-sm flex items-center rounded-tr-md rounded-br-md text-white">
                                                    <button type="button" data-quantity="plus" data-field="quantity" onClick={() => changeQuantity(ct.id, 1, 'deal')}>
                                                        <Plus size={15} />
                                                    </button>
                                                </div>
                                            </div> */}

                                            {/* <a href="/addons.html"
                                                className="lg:mx-5 px-4 py-2 lg:px-8 lg:py-3 bg-green-600 text-white rounded-md" >
                                                Edit
                                            </a> */}
                                        </div>

                                    </div>
                                })}
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-2 py-6 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.1)] fixed w-full bottom-0 font-semibold gap-2 px-3">

                        <button className="py-4 cursor-pointer rounded-full border border-black flex items-center justify-center gap-1" onClick={() => { router.back() }}> <PlusCircle size={16} /> Add More Items</button>

                        <button onClick={() => {
                            if (cart.length > 0 || mealCart.length > 0 || dealsCart.length > 0) {
                                router.push('/select-payment');
                            }
                        }} disabled={cart.length === 0 && mealCart.length === 0 && dealsCart.length === 0} className={`py-4 cursor-pointer rounded-full bg-black text-white flex items-center justify-center gap-1 ${cart.length == 0 && mealCart.length == 0 && dealsCart.length == 0 && counter.disabledBtn}`}>  <Image src={"/assets/images/Checkout.svg"} width={16} height={16} className="text-lg" /> Checkout</button>
                    </div>
                </div>
            </Layout >
        </>
    )
}

export default CartPage