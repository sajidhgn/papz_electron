import counter from '@/styles/counter.module.css'
import { Check, Minus, Plus, PlusCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { GlobalConfig } from '@/app.config'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ProductDetailTemplate = (props) => {
    const router = useRouter();

    const [productDetails, SetProductDetails] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [productaddons, SetProductAddons] = useState([]);
    const [productChoices, setProductChoices] = useState([]);
    const [choicesToSend, setChoicesToSend] = useState([]);
    const [cart, setCart] = useState([]);
    const [choiceTotalPrice, setChoiceTotalPrice] = useState(0);
    const [sizeTotalPrice, setSizeTotalPrice] = useState(0);
    const [addonsTotalPrice, setAddonsTotalPrice] = useState(0);
    const [selectedSize, setSelectedSize] = useState({
        id: '',
        size: '',
        price: '0',
        mealPrice: '0',
    })

    // Error States
    const [productError, setProductError] = useState(null);
    const [addonsError, setAddonsError] = useState(false);

    // Handle Product Quantity
    const [quantity, setQuantity] = useState(1);
    const quantityOnChange = (e) => {
        setQuantity(e.target.value);
    }

    const updateQuantity = (newQuantity) => {
        const updatedProductDetails = { ...productDetails, quantity: newQuantity };
        SetProductDetails(updatedProductDetails);
        localStorage.setItem('productDetails', JSON.stringify(updatedProductDetails));
        setQuantity(newQuantity);
    };

    const addQuantity = (e) => {
        const newQuantity = quantity + 1;
        updateQuantity(newQuantity);
    }

    const minusQuantity = (e) => {
        if (quantity >= 2) {
            const newQuantity = quantity - 1;
            updateQuantity(newQuantity);
        }
    }

    const AddStatusToChoicesArray = (choices) => {
        const updatedChoices = choices.map(choice => ({
            ...choice,
            choice_options: choice.choice_options.map(option => ({
                ...option,
                status: 0
            }))
        }));

        return updatedChoices;
    }

    const AddStatusToSizesArray = (sizes) => {
        const updatedChoices = sizes.map(size => ({
            ...size,
            status: 0,
        }));

        return updatedChoices;
    }

    const AddStatusToAddonsArray = (addons) => {
        const updatedAddons = addons.map(addon => ({
            ...addon,
            status: 1,
        }));

        return updatedAddons;
    }

    const goBack = () => {
        router.back();
    }

    const generateRecordId = () => {
        if (cart.length === 0) {
            return 1;
        } else {
            const mostRecentID = cart[cart.length - 1].id;
            return mostRecentID + 1;
        }
    }

    // const choiceOptionSelected = async (choiceId, optionId) => {
    //     const updatedChoices = productChoices.map(choice => {
    //         if (choice.id === choiceId) {
    //             return {
    //                 ...choice,
    //                 choice_options: choice.choice_options.map(option => ({
    //                     ...option,
    //                     status: option.id === parseInt(optionId) ? 1 : 0
    //                 }))
    //             };
    //         }
    //         return choice;
    //     });

    //     setProductChoices(updatedChoices);
    // }

    const choiceOptionSelected = (choiceId, optionId, price) => {
        const newChoices = productChoices.map(choice => {
            if (choice.id === choiceId) {
                const previousSelectedOption = choice.choice_options.find(option => option.status === 1);
                const newChoicesOptions = choice.choice_options.map(option => ({
                    ...option,
                    status: option.id === parseInt(optionId) ? 1 : 0
                }));

                // Ensure the price is a number before applying toFixed
                const numericPrice = Number(price).toFixed(2);

                if (previousSelectedOption) {
                    const previousPrice = Number(previousSelectedOption.price).toFixed(2);
                    setChoiceTotalPrice(prevPrice =>
                        (Number(prevPrice) - Number(previousPrice) + Number(numericPrice)).toFixed(2)
                    );
                } else {
                    setChoiceTotalPrice(prevPrice =>
                        (Number(prevPrice) + Number(numericPrice)).toFixed(2)
                    );
                }

                return {
                    ...choice,
                    choice_options: newChoicesOptions
                };
            }
            return choice;
        });

        setProductChoices(newChoices);
    };

    const sizeSelected = (sizeId, productPrice, productMealPrice, sizeName) => {
        console.log(sizeName);

        let sizePattern = {
            id: sizeId,
            size: sizeName,
            price: productPrice,
            mealPrice: productMealPrice,
        }
        setSelectedSize(sizePattern);

        SetProductDetails(prevDetails => ({
            ...prevDetails,
            selectedSize: {
                id: sizeId,
                size: sizeName,
                price: productPrice,
                mealPrice: productMealPrice,
            }
        }))

        const newSizes = productSizes.map(size => {
            if (size.id === sizeId) {
                const previousSelectedSize = productSizes.find(s => s.status === 1);
                const newSizeOptions = productSizes.map(s => ({
                    ...s,
                    status: s.id === parseInt(sizeId) ? 1 : 0
                }));
                const numericPrice = Number(productPrice).toFixed(2);

                if (previousSelectedSize) {
                    const previousPrice = Number(previousSelectedSize.pivot.product_price).toFixed(2);

                    setSizeTotalPrice(prevPrice =>
                        (Number(prevPrice) - Number(previousPrice) + Number(numericPrice)).toFixed(2)
                    );
                } else {
                    setSizeTotalPrice(prevPrice =>
                        (Number(prevPrice) + Number(numericPrice)).toFixed(2)
                    );
                }

                return {
                    ...size,
                    status: 1
                };
            }

            // Keep the other sizes as they are (not selected)
            return {
                ...size,
                status: 0
            };
        });

        setProductSizes(newSizes);
    }

    const validateChoices = () => {
        let allChoicesValid = true;
        let errorMessage = '';

        // Validate product choices
        productChoices.forEach(choice => {
            const hasSelectedOption = choice.choice_options.some(option => option.status === 1);

            if (!hasSelectedOption) {
                allChoicesValid = false;
                errorMessage = '<strong>Please complete all required selections</strong><br><i>Each option must have a selection to proceed.</i>';
            }
        });

        // Validate product sizes
        const hasSelectedSize = productSizes.some(size => size.status === 1);
        if (!hasSelectedSize) {
            allChoicesValid = false;
            errorMessage = '<strong>Please complete all required selections</strong><br><i>You are required to select a size to continue.</i>';
        }

        // Return validation result
        if (!allChoicesValid) {
            return {
                status: allChoicesValid,
                message: errorMessage,
            };
        }

        return {
            status: allChoicesValid,
        };
    };

    const addToCart = () => {
        let validation = validateChoices();
        if (validation.status) {
            let sprice = (parseFloat(selectedSize.price) + parseFloat(choiceTotalPrice) + parseFloat(addonsTotalPrice)).toFixed(2);
            let tprice = ((parseFloat(selectedSize.price) * parseFloat(quantity)) + (parseFloat(choiceTotalPrice) * parseFloat(quantity)) + (parseFloat(addonsTotalPrice) * quantity)).toFixed(2);

            const Recordid = generateRecordId();
            const recordToAdd = {
                id: Recordid,
                product_id: productDetails.id,
                product_name: productDetails.product_name,
                quantity: quantity,
                addons: productaddons,
                choices: productChoices,
                sizes: productSizes,
                selectedSize: selectedSize,
                sprice: sprice,
                choicePrice: choiceTotalPrice,
                tprice: tprice,
            };

            // Updating Cart
            setCart((prevCart) => [...prevCart, recordToAdd]);
            localStorage.setItem('cart', JSON.stringify([...cart, recordToAdd]));

            // Resetting The Sessions
            localStorage.removeItem('productDetails');
            localStorage.removeItem('addons');
            localStorage.removeItem('choices');

            router.push('/category');

            Swal.fire({
                title: 'ADDED',
                html: `
                <strong><i>Product Successfully Added</i></strong>
            `,
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
            })
        } else {
            Swal.fire({
                title: 'Incomplete Selection',
                html: validation.message,
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonColor: "#000",
            })
        }
    }

    const initialSettings = async () => {
        const coreProductData = props.pDetail;
        coreProductData.quantity = quantity;

        // Dealing With Core Product Details
        SetProductDetails(coreProductData);
        localStorage.setItem('productDetails', JSON.stringify(coreProductData));

        // Dealing With Product Sizes
        // setProductSizes(props.sizes);
        const sizes = props.sizes;
        const updatedSizesArray = await AddStatusToSizesArray(sizes);
        setProductSizes(updatedSizesArray);

        // Dealing With Product Addons
        const addons = props.addons;
        if (addons && addons.length >= 1) {
            const updatedAddonsArray = await AddStatusToAddonsArray(coreProductData.addons);
            SetProductAddons(updatedAddonsArray);
            localStorage.setItem('addons', JSON.stringify(updatedAddonsArray));
        } else {
            setAddonsError(true);
        }

        // Dealing With Product Choices
        const choices = props.choices;
        const updatedChoicesArray = await AddStatusToChoicesArray(choices);
        setProductChoices(updatedChoicesArray);

        localStorage.setItem('productDetailsFetchStatus', JSON.stringify(false));
    }

    const customiseMeal = () => {
        let validation = validateChoices();
        if (!validation.status) {
            Swal.fire({
                title: 'Incomplete Selection',
                html: validation.message,
                icon: 'warning',
                // timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: "#000",
            })
            return;
        }

        router.push('/customise-meal')
    }

    const calculateChoiceTotalPrice = (choices) => {
        // Initialize total price
        let totalPrice = 0;

        // Iterate through each choice
        choices.forEach(choice => {
            // Iterate through each option within the choice
            choice.choice_options.forEach(option => {
                // Check if the option's status is 1
                if (option.status === 1) {
                    // Convert price to a float and add to the total
                    totalPrice += parseFloat(option.price);
                }
            });
        });

        // Return total price, fixed to 2 decimal places
        return parseFloat(totalPrice.toFixed(2));
    };

    const calculateSizesTotalPrice = (sizes) => {
        // Initialize total price
        let totalPrice = 0; let mealPrice = 0;
        let pSize; let pId;

        // Iterate through each choice
        sizes.forEach(size => {
            if (size.status === 1) {
                pId = size.id;
                totalPrice = parseFloat(size.pivot.product_price);
                mealPrice = parseFloat(size.pivot.meal_price);
                pSize = size.size_name;

                return;
            }
        });

        const activeSize = {
            id: pId,
            size: pSize,
            price: totalPrice.toFixed(2),
            mealPrice: mealPrice.toFixed(2),
        }

        return activeSize;
    };

    const calculateAddonsTotalPrice = (addons) => {
        let totalPrice = 0;
        if (addons && addons.length > 0) {
            const filteredAddons = addons.filter(addon => addon.status == 2 && addon.pivot.has_price === 1);

            totalPrice = filteredAddons.reduce((sum, addon) => {
                return sum + parseFloat(addon.pivot.price);
            }, 0);
        }

        return totalPrice;
    }

    useEffect(() => {
        SetProductAddons([]);
        const status = JSON.parse(localStorage.getItem('productDetailsFetchStatus'));
        if (status) {
            localStorage.setItem('addons', JSON.stringify(''));
            initialSettings();
        } else {
            const coreProductDetails = JSON.parse(localStorage.getItem('productDetails'));
            SetProductDetails(coreProductDetails);

            // Setting Up Addons
            const addonsList = JSON.parse(localStorage.getItem('addons'));
            SetProductAddons(addonsList);
            let addonsTotalPrice = calculateAddonsTotalPrice(addonsList);
            setAddonsTotalPrice(addonsTotalPrice);
            if (!addonsList && addonsList.length < 1) {
                setAddonsError(true);
            }

            // Setting Up Sizes
            const sizes = JSON.parse(localStorage.getItem('sizes'));
            setProductSizes(sizes);
            let activeSize = calculateSizesTotalPrice(sizes);
            setSizeTotalPrice(activeSize.price);
            setSelectedSize({
                id: activeSize.id,
                size: activeSize.size,
                price: activeSize.price,
                mealPrice: activeSize.mealPrice,
            })

            // Setting Up Choices
            const choices = JSON.parse(localStorage.getItem('choices'));
            setProductChoices(choices);
            let choicesTotal = calculateChoiceTotalPrice(choices);
            setChoiceTotalPrice(choicesTotal);

            setQuantity(coreProductDetails.quantity);
        }

        // Initializing Cart State
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        setCart(cartItems);

    }, []);

    useEffect(() => {
        localStorage.setItem('sizes', JSON.stringify(productSizes));
    }, [productSizes]);

    useEffect(() => {
        localStorage.setItem('choices', JSON.stringify(productChoices));
    }, [productChoices]);

    useEffect(() => {
        localStorage.setItem('productDetails', JSON.stringify(productDetails));
        console.log(productDetails);

    }, [productDetails])


    return (
        <>
            <ToastContainer stacked />

            <div className="px-2 flex flex-col flex-1 mt-10 lg:mt-0 pr-4 pl-6 lg:px-16">
                <div className="flex flex-col md:flex-row w-full pb-5 lg:px-5 lg:py-5 border-b border-b-gray-300 items-start">

                    <div className="product-img">
                        <Image src={GlobalConfig.siteurl + 'storage/' + productDetails.product_image} alt={productDetails.product_name} className="w-40 md:w-52" height={50} width={50}
                        // placeholder='blur'
                        // blurDataURL={`data:image/jpeg;base64,${productDetails.product_image_lqip}`}
                        />
                    </div>

                    <div className="flex flex-col product-desc p-0 lg:p-5 justify-center flex-1 md:ml-5 lg:ml-0">

                        {/* Name and Price */}
                        <div className="flex flex-col w-full gap-3">
                            <div className="flex sm:flex-col md:flex-row justify-between items-center">
                                <p className="text-4xl lg:text-6xl font-semibold">{productDetails.product_name}</p>
                                {/* {
                                    productDetails.meal_capability === "yes" && productDetails.products_status === "main" && <Link href={'/customise-meal'} className="px-3 py-2 bg-red-800 text-white rounded-sm h-fit text-sm mt-4 lg:mt-0">Make It A Meal</Link>
                                } */}
                            </div>

                            <div className="flex w-full justify-between">
                                <div className="w-fit flex bg-black text-white px-2 gap-2">
                                    <p className="font-semibold text-lg">Price : {selectedSize.price} </p>
                                    {
                                        productDetails.meal_capability === "yes" && productDetails.products_status === "main" && <>
                                            <div className="w-fit flex bg-black text-white px-2 gap-2">
                                                <p className="font-semibold text-lg"> | </p>
                                                <p className="font-semibold text-lg">Meal Price : {selectedSize.mealPrice}</p>
                                            </div>
                                        </>
                                    }
                                </div>

                                <div className="w-fit flex bg-black text-white px-2">
                                    <p className="font-semibold text-lg">Total : {((selectedSize.price * quantity) + (choiceTotalPrice * quantity) + (addonsTotalPrice * quantity)).toFixed(2)} </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex my-6 gap-2">
                            {productSizes.map((size, index) => {
                                let className;
                                if (size.status == 0) {
                                    className = 'border border-black'
                                } else if (size.status = 1) {
                                    className = 'bg-black text-white'
                                }
                                return (
                                    <p key={index} className={`rounded-full px-5 py-2 cursor-pointer ${className}`} onClick={() => sizeSelected(size.id, size.pivot.product_price, size.pivot.meal_price, size.size_name)}>{size.size_name} : {size.pivot.product_price}</p>
                                )
                            })}

                            {/* {productS} */}
                            {/* {productSizes.length}
                            {productSizes.map((size, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <p className="text-xl font-semibold">{size.size_name} <span className="text-red-500 text-xs italic">(required)</span> </p>
                                    </div>
                                );
                            })} */}
                        </div>

                        {productChoices && productChoices.length > 0 && (
                            <div className="grid grid-cols-2 my-6 gap-4">
                                {productChoices.map((choice, index) => {
                                    // Find the option with status 1 for each choice
                                    const selectedOption = choice.choice_options.find(option => option.status === 1);

                                    return (
                                        <div className="flex flex-col gap-2" key={index}>
                                            <p className="text-xl font-semibold">{choice.choice_name} <span className="text-red-500 text-xs italic">(required)</span> </p>

                                            <Select
                                                onValueChange={(value) => choiceOptionSelected(choice.id, value, choice.choice_options.find(option => option.id.toString() === value).price)}
                                                // Set the defaultValue to the id of the selected option
                                                defaultValue={selectedOption ? selectedOption.id.toString() : undefined}
                                            >
                                                <SelectTrigger className="w-full text-base p-6 rounded-full">
                                                    <SelectValue placeholder="Tap to select" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {choice.choice_options.map((option) => (
                                                        <SelectItem key={option.id} value={option.id.toString()}>
                                                            {option.option_name} {option.has_price == 1 && `(+${option.price})`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    );
                                })}


                                {/* <div className="flex flex-col">
                                <p className="text-2xl font-bold">Choose Your Salad</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex gap-2 justify-between text-xl px-2 py-3 border-b border-b-gray-400">
                                        <label className="flex justify-between w-full cursor-pointer">
                                            <p>Salad</p>
                                            <input type="radio" name="choice" className="transform scale-150" />
                                        </label>
                                    </div>

                                    <div className="flex gap-2 justify-between text-xl px-2 py-3 border-b border-b-gray-400">
                                        <label className="flex justify-between w-full cursor-pointer">
                                            <p>No Salad</p>
                                            <input type="radio" name="choice" className="transform scale-150" />
                                        </label>
                                    </div>

                                    <div className="flex gap-2 justify-between text-xl px-2 py-3 border-b border-b-gray-400">
                                        <label className="flex justify-between w-full cursor-pointer">
                                            <p>Little Salad</p>
                                            <input type="radio" name="choice" className="transform scale-150" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-2xl font-bold">Choose Your Protein</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex gap-2 justify-between text-xl px-2 py-3 border-b border-b-gray-400">
                                        <label className="flex justify-between w-full cursor-pointer">
                                            <p>Meat</p>
                                            <input type="radio" name="protein" className="transform scale-150" />
                                        </label>
                                    </div>

                                    <div className="flex gap-2 justify-between text-xl px-2 py-3 border-b border-b-gray-400">
                                        <label className="flex justify-between w-full cursor-pointer">
                                            <p>Chicken</p>
                                            <input type="radio" name="protein" className="transform scale-150" />
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-5">
                            {/* <div className="desc font-semibold text-slate-700 lg:text-xl lg:font-semibold">Want to customise your {productDetails.product_name}?</div> */}
                            {!addonsError && (
                                <Link href={'/customise'} className="border border-black text-black text-center py-4 font-semibold lg:mt-3 focus:bg-black focus:text-white rounded-full">Customise</Link>
                            )}

                            {
                                productDetails.meal_capability === "yes" && productDetails.products_status === "main" && <div onClick={customiseMeal} className="border border-black text-center focus:bg-black focus:text-white py-4 font-semibold lg:mt-3 rounded-full cursor-pointer">Make A Meal</div>
                            }
                        </div>

                        {productaddons.length > 1 && (
                            <div className="grid grid-cols-2 gap-0 mt-4 font-semibold">
                                {productaddons.length >= 1 ? (
                                    productaddons.map((addon, index) => {
                                        return addon.status != 1 ? (
                                            addon.status === 0 ? (
                                                <div className="flex items-center gap-1">
                                                    <Check size={18} />
                                                    <div key={index}>No {addon.addon_name}</div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <Check size={18} />
                                                    <div key={index}>Extra {addon.addon_name}</div>
                                                </div>
                                            )
                                        ) : (
                                            ""
                                        )
                                    })
                                ) : (
                                    ""
                                )}
                            </div>
                        )}

                    </div>
                </div>

                <div className={`input-group ${counter.plusMinusInput} flex justify-center mt-10 gap-4`}>
                    <div className="input-group-button text-md lg:text-xl flex items-center rounded-tl-md rounded-bl-md text-white">
                        <button type="button" data-quantity="minus" data-field="quantity" className='bg-black h-14 w-14 rounded-full flex items-center justify-center' onClick={minusQuantity}>
                            <Minus size={25} />
                        </button>
                    </div>

                    <input
                        className={`${counter.inputGroupField} text-2xl lg:text-4xl text-center w-1/5 border border-gray-500 bg-transparent rounded-full font-semibold`}
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={quantityOnChange}
                    />

                    <div className="input-group-button text-md lg:text-xl flex items-center rounded-tl-md rounded-bl-md text-white">
                        <button type="button" data-quantity="plus" data-field="quantity" className='bg-black h-14 w-14 rounded-full flex items-center justify-center' onClick={addQuantity}>
                            <Plus size={25} />
                        </button>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-2 justify-center py-6 px-5 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.1)] fixed w-full bottom-0 font-semibold gap-3">
                <button className="py-4 cursor-pointer rounded-full border border-black" onClick={goBack}>Cancel</button>
                <button onClick={addToCart} className="py-4 cursor-pointer rounded-full bg-black text-white flex items-center justify-center gap-1"> <PlusCircle size={18} /> Add To Order</button>
            </div>
        </>
    )
}

export default ProductDetailTemplate