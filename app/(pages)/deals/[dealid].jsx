import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoBackButton } from "../../components/goBackButton"
import { GlobalConfig } from '@/app.config'
import counter from '@/styles/counter.module.css'
import { CircleDot, Dot, Minus, Plus, X, XIcon, PlusCircle, Check } from 'lucide-react';
import Layout from '../../components/layout'
import Image from 'next/image';
import Swal from 'sweetalert2'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { getProductDetails } from '../../../lib/getProductDetails';

const DealDetail = () => {
    const router = useRouter();
    const { dealid } = router.query;
    const targetDealId = parseInt(dealid);

    const [dealDetails, setDealDetails] = useState({});
    const [thisDealItems, setThisDealItems] = useState({});
    const [productCategories, setProductCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [changeId, setChangeId] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        const dealData = JSON.parse(localStorage.getItem('allDeals'));
        if (dealData) {
            let data = dealData.find(record => record.id === targetDealId);
            setDealDetails(data);
            setProductCategories(data.deal_menu_categories);
            setProducts(data.deal_menu_items);
            const refinedDeal = {
                id: 0,
                deal_id: data.id,
                name: data.deal_name,
                quantity: 1,
                image: data.deal_image,
                sprice: data.deal_price,
                tprice: data.deal_price,
                selectedProducts: [],
                singleItems: data.deal_menu_items,
            }

            setThisDealItems(refinedDeal);
        }
    }, [])

    useEffect(() => {
        if (changeId) {
            const dCart = JSON.parse(localStorage.getItem('dealsCart'));
            dCart.push({ ...thisDealItems });
            setChangeId(false);
            localStorage.setItem('dealsCart', JSON.stringify(dCart));
        }
    }, [thisDealItems])

    // Handle Product Quantity
    const [quantity, setQuantity] = useState(1);
    const quantityOnChange = (e) => {
        updateQuantity(e.target.value);
        setQuantity(e.target.value);
    }

    const updateQuantity = (newQuantity) => {
        const updatedDealDetails = { ...thisDealItems, quantity: newQuantity, tprice: parseFloat(thisDealItems.sprice) * newQuantity };
        setThisDealItems(updatedDealDetails);
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

    const goBack = () => {
        router.back();
    }

    const validateCart = () => {
        if (selectedData.length < productCategories.length) {
            return {
                status: 'error',
                message: 'Please complete your item selection before proceeding.'
            };
        }

        // Flag to track if all categories are validated
        let allCategoriesValid = true;

        // Iterate over each category
        for (const category of selectedData) {
            const { quantity, selected_products } = category;

            // Ensure selected_products is an array and not empty
            if (!Array.isArray(selected_products) || selected_products.length === 0) {
                return {
                    status: 'error',
                    message: `No products selected for category "${category.category_name}".`
                };
            }

            // Check if the number of selected products matches the required quantity
            if (selected_products.length < parseInt(quantity)) {
                allCategoriesValid = false; // Set flag to false
                return {
                    status: 'error',
                    message: `You need to select ${quantity} products for category "${category.category_name}".`
                };
            }

            // Validate each selected product
            let validProductCount = 0;
            for (const product of selected_products) {
                // Validate product id
                if (!product.pid) {
                    continue; // Skip to next product if no product ID is selected
                }

                // Check if the product has choices
                const choices = productCategories
                    .find(cat => cat.category_id === category.category_id)
                    ?.category.products.find(prod => prod.id === product.pid)
                    ?.choices;

                // If choices exist, validate that they have been selected
                if (choices) {
                    const allChoicesSelected = choices.every(choice => {
                        const selectedOption = product.choice_options.find(opt => opt.choice_id === choice.id);
                        return selectedOption && selectedOption.option_id; // Ensure option is selected
                    });

                    if (!allChoicesSelected) {
                        return {
                            status: 'error',
                            message: `Please select options for all options for "${product.product_name}".`
                        };
                    }
                }

                validProductCount++; // Increment valid product count
            }

            // Check if the count of valid products matches the required quantity
            if (validProductCount < parseInt(quantity)) {
                allCategoriesValid = false; // Set flag to false
                return {
                    status: 'error',
                    message: `You need to select ${quantity} valid products for category "${category.category_name}".`
                };
            }
        }

        // Check if any categories are unselected
        const allCategoriesSelected = selectedData.every(cat =>
            cat.selected_products.length > 0
        );

        if (!allCategoriesSelected) {
            return {
                status: 'error',
                message: 'You need to select at least one product from each category.'
            };
        }

        return {
            status: 'success',
            message: 'All validations passed. Ready to add to cart!'
        };
    };

    const addToCart = () => {
        const validationResult = validateCart();
        if (validationResult.status === 'error') {
            Swal.fire({
                title: 'OOPPSS',
                html: `
                    <strong><i>${validationResult.message}</i></strong>
                `,
                icon: 'warning',
                showConfirmButton: true,
                confirmButtonColor: '#000',
            })
        } else {
            const dCart = JSON.parse(localStorage.getItem('dealsCart'));
            if (!dCart || dCart.length < 1) {
                let newCart = [];
                newCart.push({ ...thisDealItems });
                localStorage.setItem('dealsCart', JSON.stringify(newCart));
            } else {
                const mostRecentRecord = dCart[dCart.length - 1];
                const mostRecentId = mostRecentRecord.id;
                const newId = mostRecentId + 1;

                setChangeId(true);
                setThisDealItems(prevState => ({
                    ...prevState,
                    id: newId,
                }));
            }

            router.push('/category');
            Swal.fire({
                title: 'ADDED',
                html: `
                    <strong><i>Deal Confirmed</i></strong>
                `,
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
            })
        }


        // const dCart = JSON.parse(localStorage.getItem('dealsCart'));
        // if (!dCart || dCart.length < 1) {
        //     let newCart = [];
        //     newCart.push({ ...thisDealItems });
        //     localStorage.setItem('dealsCart', JSON.stringify(newCart));
        // } else {
        //     const mostRecentRecord = dCart[dCart.length - 1];
        //     const mostRecentId = mostRecentRecord.id;
        //     const newId = mostRecentId + 1;

        //     setChangeId(true);
        //     setThisDealItems(prevState => ({
        //         ...prevState,
        //         id: newId,
        //     }));
        // }

        // router.push('/category');
        // Swal.fire({
        //     title: 'ADDED',
        //     html: `
        //         <strong><i>Deal Confirmed</i></strong>
        //     `,
        //     icon: 'success',
        //     timer: 1000,
        //     showConfirmButton: false,
        // })
    }

    // const productSelected = (categoryId, index, productId) => {
    //     const categoryIndex = selectedData.findIndex(data => data.category_id === categoryId);

    //     if (categoryIndex >= 0) {
    //         const updatedProducts = [...selectedData[categoryIndex].selected_products];

    //         // Reset the choice options when the product changes
    //         updatedProducts[index] = {
    //             pid: productId,
    //             product_name: productCategories.find(cat => cat.id === categoryId)
    //                 ?.products.find(prod => prod.id === productId)?.product_name || '',
    //             choice_options: [] // Reset choice options
    //         };

    //         const updatedData = [...selectedData];
    //         updatedData[categoryIndex].selected_products = updatedProducts;
    //         setSelectedData(updatedData);
    //     } else {
    //         // Get quantity from the pivot object
    //         const quantity = productCategories.find(cat => cat.id === categoryId)?.pivot.quantity || "1";

    //         setSelectedData(prevData => [
    //             ...prevData,
    //             {
    //                 category_id: categoryId,
    //                 category_name: productCategories.find(cat => cat.id === categoryId)?.category_name || '',
    //                 quantity: quantity, // Add the quantity here
    //                 selected_products: Array.from({ length: quantity }).map((_, i) =>
    //                     i === index ? {
    //                         pid: productId,
    //                         product_name: productCategories.find(cat => cat.id === categoryId)
    //                             ?.products.find(prod => prod.id === productId)?.product_name || '',
    //                         choice_options: [] // Reset choice options
    //                     } : { pid: null, choice_options: [] }
    //                 )
    //             }
    //         ]);
    //     }
    // };

    // // Function to handle choice selection for a product
    // const handleChoiceSelection = (categoryId, productIndex, choiceId, optionId) => {
    //     // Find the selected category
    //     const category = selectedData.find(data => data.category_id === categoryId);
    //     if (!category) return;

    //     // Find the product within the selected category
    //     const product = category.selected_products[productIndex];
    //     if (!product) return;

    //     // Find the choice by its ID
    //     const choice = productCategories
    //         .find(cat => cat.id === categoryId)
    //         ?.products.find(prod => prod.id === product.pid)
    //         ?.choices.find(choice => choice.id === choiceId);

    //     // Find the option by its ID
    //     const option = choice?.choice_options.find(opt => opt.id === parseInt(optionId));

    //     if (choice && option) {
    //         // Update the selected option for this choice
    //         const updatedChoiceOptions = product.choice_options.filter(opt => opt.choice_id !== choiceId);
    //         updatedChoiceOptions.push({
    //             choice_id: choiceId,
    //             choice_name: choice.choice_name, // Include the choice name
    //             option_id: optionId,
    //             option_name: option.option_name // Include the option name
    //         });

    //         // Update the selectedData state
    //         const updatedProducts = [...category.selected_products];
    //         updatedProducts[productIndex] = {
    //             ...product,
    //             choice_options: updatedChoiceOptions
    //         };

    //         const updatedData = selectedData.map(data =>
    //             data.category_id === categoryId ? { ...data, selected_products: updatedProducts } : data
    //         );

    //         setSelectedData(updatedData);
    //     }
    // };

    const productSelected = (categoryId, index, productId, size) => {
        const categoryIndex = selectedData.findIndex(data => data.category_id === categoryId);

        if (categoryIndex >= 0) {
            const updatedProducts = [...selectedData[categoryIndex].selected_products];

            // Reset the choice options when the product changes
            updatedProducts[index] = {
                pid: productId,
                product_name: productCategories.find(cat => cat.category.id === categoryId)
                    ?.category.products.find(prod => prod.id === productId)?.product_name || '',
                choice_options: [] // Reset choice options
            };

            // Reset all choice options for the newly selected product
            const selectedProduct = productCategories.find(cat => cat.category.id === categoryId)
                ?.category.products.find(prod => prod.id === productId);

            if (selectedProduct) {
                selectedProduct.choices.forEach(choice => {
                    updatedProducts[index].choice_options.push({
                        choice_id: choice.id,
                        choice_name: choice.choice_name,
                        option_id: null, // Reset option_id to null
                        option_name: null // Reset option_name to null
                    });
                });
            }

            const updatedData = [...selectedData];
            updatedData[categoryIndex] = {
                ...updatedData[categoryIndex], // Keep other properties unchanged
                selected_products: updatedProducts // Update selected_products
            };

            setSelectedData(updatedData);
        } else {
            const quantity = productCategories.find(cat => cat.category_id === categoryId)?.quantity || "1";

            setSelectedData(prevData => [
                ...prevData,
                {
                    category_id: categoryId,
                    category_name: productCategories.find(cat => cat.category_id === categoryId)?.category.category_name || '',
                    quantity: quantity,
                    size: size,
                    selected_products: Array.from({ length: quantity }).map((_, i) =>
                        i === index ? {
                            pid: productId,
                            product_name: productCategories.find(cat => cat.category_id === categoryId)
                                ?.category.products.find(prod => prod.id === productId)?.product_name || '',
                            choice_options: [] // Reset choice options
                        } : { pid: null, choice_options: [] }
                    )
                }
            ]);
        }
    };

    // Function to handle choice selection for a product
    const handleChoiceSelection = (categoryId, productIndex, choiceId, optionId) => {

        // Find the selected category
        const category = selectedData.find(data => data.category_id === categoryId);
        if (!category) return;

        // Find the product within the selected category
        const product = category.selected_products[productIndex];
        if (!product) return;

        // Find the choice by its ID
        const choice = productCategories
            .find(cat => cat.category_id === categoryId)
            ?.category.products.find(prod => prod.id === product.pid)
            ?.choices.find(choice => choice.id === choiceId);

        // Find the option by its ID
        const option = choice?.choice_options.find(opt => opt.id === parseInt(optionId));

        if (choice && option) {
            // Update the selected option for this choice
            const updatedChoiceOptions = product.choice_options.filter(opt => opt.choice_id !== choiceId);
            updatedChoiceOptions.push({
                choice_id: choiceId,
                choice_name: choice.choice_name, // Include the choice name
                option_id: optionId,
                option_name: option.option_name // Include the option name
            });

            // Update the selectedData state
            const updatedProducts = [...category.selected_products];
            updatedProducts[productIndex] = {
                ...product,
                choice_options: updatedChoiceOptions
            };

            const updatedData = selectedData.map(data =>
                data.category_id === categoryId ? { ...data, selected_products: updatedProducts } : data
            );
            setSelectedData(updatedData);
        }
    };

    useEffect(() => {
        console.log(selectedData);
        setThisDealItems(prevItems => ({
            ...prevItems,
            selectedProducts: selectedData
        }));
    }, [selectedData])


    return (
        <>
            <Layout>
                <GoBackButton />
                <div className="px-2 flex flex-col flex-1 mt-10 lg:mt-0 pr-4 pl-6 lg:px-16">
                    <div className="flex flex-col md:flex-row w-full pb-5 lg:px-5 lg:py-5 border-b border-b-gray-300 md:items-start items-center">

                        <div className="product-img">
                            <img src={GlobalConfig.siteurl + 'storage/' + dealDetails.deal_image} alt={dealDetails.deal_name} className="w-40 md:w-52" height={50} width={50} />
                        </div>

                        <div className="flex flex-col product-desc p-0 lg:p-5 justify-center flex-1 md:ml-5 lg:ml-0">

                            {/* Name and Price */}
                            <div className="flex flex-col w-full gap-4">
                                <div className="flex sm:flex-col md:flex-row justify-between items-center">
                                    <div className="flex flex-col">
                                        <p className="text-4xl lg:text-6xl">{dealDetails.deal_name}</p>
                                        <p className="text-lg">{dealDetails.description}</p>
                                    </div>

                                    <div className="w-fit flex bg-black text-white px-2 gap-2">
                                        <p className="font-semibold text-lg">Price : {dealDetails.deal_price} </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2">
                                    {/* Displaying The Products */}
                                    {products && (
                                        products.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex items-center gap-1">
                                                <Check size={16} />
                                                <div className="font-semibold flex items-center">
                                                    <span className="text-lg">{item.quantity}</span> x
                                                </div>
                                                <div>{item.size.size_name}</div>
                                                <div>{item.product.product_name}</div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="flex flex-col gap-10">
                                    {/* Displaying The Categories */}
                                    {productCategories && (
                                        productCategories.map((cat, catIndex) => (
                                            <div className="flex flex-col gap-2" key={catIndex}>
                                                <p className="text-4xl font-semibold w-full text-center">{cat.category.category_name}</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {Array.from({ length: cat.quantity }).map((_, productIndex) => (
                                                        <div key={productIndex} className="flex flex-col gap-2">
                                                            <p className="text-xl font-semibold">Select Your {cat.category.category_name} -  {productIndex + 1}</p>
                                                            <Select
                                                                onValueChange={(value) => productSelected(cat.category_id, productIndex, parseInt(value), cat.size)}
                                                            >
                                                                <SelectTrigger className="w-full text-base p-6 rounded-full">
                                                                    <SelectValue placeholder="Tap to select" />
                                                                </SelectTrigger>

                                                                <SelectContent>
                                                                    {cat.category.products.map((product) => (
                                                                        <SelectItem key={product.id} value={product.id.toString()}>
                                                                            {product.product_name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>

                                                            {/* Display choices for the selected product */}
                                                            {/* {selectedData.find(data => data.category_id === cat.category_id)?.selected_products[productIndex]?.pid && (
                                                                cat.category.products.find(prod => prod.id === selectedData.find(data => data.category_id === cat.id)?.selected_products[productIndex]?.pid)?.choices.map((choice) => (
                                                                    <div key={choice.id} className="flex flex-col gap-2">
                                                                        <p className="text-lg">{choice.choice_name}</p>
                                                                        <Select
                                                                            onValueChange={(selectedOption) => {
                                                                                // Handle the choice selection
                                                                                handleChoiceSelection(cat.id, productIndex, choice.id, selectedOption);
                                                                            }}>
                                                                            <SelectTrigger className="w-full text-base p-6 rounded-full">
                                                                                <SelectValue placeholder="Select an option" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {choice.choice_options.map(option => (
                                                                                    <SelectItem key={option.id} value={option.id.toString()}>
                                                                                        {option.option_name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                ))
                                                            )} */}

                                                            {selectedData.find(data => data.category_id === cat.category_id)?.selected_products[productIndex]?.pid && (
                                                                // Corrected the category ID comparison from cat.id to cat.category_id
                                                                cat.category.products.find(prod => prod.id === selectedData.find(data => data.category_id === cat.category_id)?.selected_products[productIndex]?.pid)?.choices.map((choice) => (
                                                                    <div key={choice.id} className="flex flex-col gap-2">
                                                                        <p className="text-lg">{choice.choice_name}</p>
                                                                        <Select
                                                                            // Updated key to include product ID and choice ID for uniqueness
                                                                            key={`${selectedData.find(data => data.category_id === cat.category_id)?.selected_products[productIndex]?.pid}-${choice.id}`}
                                                                            onValueChange={(selectedOption) => {
                                                                                handleChoiceSelection(cat.category_id, productIndex, choice.id, selectedOption);
                                                                            }}>
                                                                            <SelectTrigger className="w-full text-base p-6 rounded-full">
                                                                                <SelectValue placeholder="Select an option" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {choice.choice_options.map(option => (
                                                                                    <SelectItem key={option.id} value={option.id.toString()}>
                                                                                        {option.option_name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* <div className={`input-group ${counter.plusMinusInput} flex justify-center mt-10`}>
                        <div className="input-group-button bg-fuchsia-800 px-5 py-1 text-md lg:text-xl flex items-center rounded-tl-md rounded-bl-md text-white">
                            <button type="button" data-quantity="minus" data-field="quantity" onClick={minusQuantity}>
                                <Minus size={25} />
                            </button>
                        </div>
                        <input
                            className={`${counter.inputGroupField} text-2xl lg:text-4xl text-center py-3 w-1/5 border border-gray-300`}
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={quantityOnChange}
                        />
                        <div className="input-group-button bg-fuchsia-800 px-5 py-1 text-md lg:text-xl flex items-center rounded-tr-md rounded-br-md text-white">
                            <button type="button" data-quantity="plus" data-field="quantity" onClick={addQuantity}>
                                <Plus size={25} />
                            </button>
                        </div>
                    </div> */}

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
            </Layout>

            <div className="grid grid-cols-2 justify-center py-6 px-5 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.1)] fixed w-full bottom-0 font-semibold gap-3">
                <button className="py-4 cursor-pointer rounded-full border border-black" onClick={goBack}>Cancel</button>
                <button onClick={addToCart} className="py-4 cursor-pointer rounded-full bg-black text-white flex items-center justify-center gap-1"> <PlusCircle size={18} /> Add To Order</button>
            </div>
        </>
    )
}

export default DealDetail