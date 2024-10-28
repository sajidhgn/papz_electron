import { useEffect, useState } from "react";
import { GlobalConfig } from '@/app.config'
import Layout from '@/components/layout'
import { Croissant, CupSoda, CircleX, MoveLeft, Plus, X, CheckCircle, Check } from "lucide-react";
import { useRouter } from "next/router";
import MealModal from "@/components/modals/mealModal";
import getMealItems from "@/lib/getMealItems";
import Swal from 'sweetalert2'
import Image from "next/image";
import { GoBackButton } from "@/components/goBackButton";

const CustomiseMeal = () => {

    const router = useRouter();
    const [productaddons, SetProductAddons] = useState([]);
    const [productChoices, setProductChoices] = useState([]);
    const [productSizes, setProductSizes] = useState([])
    const [thisMealItems, setThisMealItems] = useState({});
    const [drinkCount, setDrinkCount] = useState(0);
    const [drinkData, setDrinkData] = useState([]);
    const [sideItemCount, setSideItemCount] = useState(0);
    const [sideItemData, setSideItemData] = useState([]);
    const [showMealModal, setShowMealModal] = useState(false);
    const [dataForModal, setDataForModal] = useState([]);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [choiceTotalPrice, setChoiceTotalPrice] = useState(0);
    const [addonsTotalPrice, setAddonsTotalPrice] = useState(0);
    const [changeId, setChangeId] = useState(false);
    const [selectedSize, setSelectedSize] = useState({});

    const addProductToMeal = async (product) => {
        const updatedArray = [...mealProducts, product];
        setMealProducts(updatedArray);
        localStorage.setItem('customisedMealsCart', JSON.stringify(updatedArray));
    }

    const calculateChoiceTotalPrice = (choices) => {
        let totalPrice = 0;

        choices.forEach(choice => {
            choice.choice_options.forEach(option => {
                if (option.status === 1) {
                    totalPrice += parseFloat(option.price);
                }
            });
        });

        return totalPrice;
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
    };

    useEffect(() => {
        const status = JSON.parse(localStorage.getItem('productDetails'));

        let totalForProductChoices = 0;
        let totalForProductAddons = 0;

        // Addons
        if (status.addons && (status.addons).length > 0) {
            let addons = JSON.parse(localStorage.getItem('addons'));
            SetProductAddons(addons);

            totalForProductAddons = calculateAddonsTotalPrice(addons);
            setAddonsTotalPrice(totalForProductAddons);
        } else {
            SetProductAddons(null);
        }

        // Choices
        if (status.choices && (status.choices).length > 0) {
            let choices = JSON.parse(localStorage.getItem('choices'));
            setProductChoices(choices);

            totalForProductChoices = calculateChoiceTotalPrice(choices);
            setChoiceTotalPrice(totalForProductChoices);
        } else {
            setProductChoices(null);
        }

        // Sizes
        if (status.sizes && (status.sizes).length > 0) {
            let sizes = JSON.parse(localStorage.getItem('sizes'));

            setProductSizes(sizes);
        } else {
            setProductSizes(null);
        }
        setSelectedSize(status.selectedSize);

        const MealPreparingCart = JSON.parse(localStorage.getItem('MealPreparingCart'));
        if (!MealPreparingCart) {
            let initialAmount = (parseFloat(status.selectedSize.mealPrice) + totalForProductChoices + totalForProductAddons).toFixed(2);
            const refinedProductDetails = {
                id: 0,
                sprice: initialAmount,
                tprice: initialAmount,
                quantity: 1,
                main: {
                    pid: status.id,
                    name: status.product_name,
                    price: status.product_price,
                    meal_price: status.meal_price,
                    image: status.product_image,
                    lqip: status.product_image_lqip,
                    addons: productaddons,
                    choices: productChoices,
                    sizes: productSizes,
                    selectedSize: selectedSize,
                },
                side: {},
                drink: {},
            };

            setThisMealItems(refinedProductDetails);
            setTotalAmount(initialAmount);
            localStorage.setItem('MealPreparingCart', JSON.stringify(refinedProductDetails));
        } else {
            let isSide = false;
            let isDrink = false;
            if (!MealPreparingCart.side || Object.keys(MealPreparingCart.side).length > 0) {
                isSide = true;
                setSideItemCount(1);
            }

            if (!MealPreparingCart.drink || Object.keys(MealPreparingCart.drink).length > 0) {
                isDrink = true;
                setDrinkCount(1);
            }

            if (isDrink && isSide) {
                setShowConfirmButton(true);
            }

            setThisMealItems(MealPreparingCart);
        }

        MealSideAndDrinkItems();
    }, [])

    useEffect(() => {
        setThisMealItems(prevState => ({
            ...prevState,
            main: {
                ...prevState.main,
                addons: productaddons
            }
        }));
    }, [productaddons])

    useEffect(() => {
        setThisMealItems(prevState => ({
            ...prevState,
            main: {
                ...prevState.main,
                choices: productChoices
            }
        }));
    }, [productChoices])

    useEffect(() => {
        setThisMealItems(prevState => ({
            ...prevState,
            main: {
                ...prevState.main,
                sizes: productSizes
            }
        }));
    }, [productSizes])

    useEffect(() => {
        setThisMealItems(prevState => ({
            ...prevState,
            main: {
                ...prevState.main,
                selectedSize: selectedSize
            }
        }));
    }, [selectedSize])

    useEffect(() => {
        localStorage.setItem('MealPreparingCart', JSON.stringify(thisMealItems));

        if (changeId) {
            const cart = JSON.parse(localStorage.getItem('mealCart'));
            cart.push({ ...thisMealItems });
            setChangeId(false);
            localStorage.setItem('mealCart', JSON.stringify(cart));

            // router.push('/category');

            // Swal.fire({
            //     title: 'ADDED',
            //     html: `
            //         <strong><i>Meal Confirmed</i></strong>
            //     `,
            //     icon: 'success',
            //     timer: 1000,
            //     showConfirmButton: false,
            // })
        }

        if (sideItemCount > 0 && drinkCount > 0) {
            setShowConfirmButton(true);
        } else {
            setShowConfirmButton(false);
        }

    }, [thisMealItems]);

    const MealSideAndDrinkItems = async () => {
        const sidesAndDrinks = JSON.parse(localStorage.getItem('sidesAndDrinks'));
        if (!sidesAndDrinks) {
            const data = await getMealItems();
            setDrinkData(data.drinks);
            setSideItemData(data.side);

            const combinedData = { side: data.side, drinks: data.drinks };
            localStorage.setItem('sidesAndDrinks', JSON.stringify(combinedData));
        } else {
            const mealItemsData = JSON.parse(localStorage.getItem('sidesAndDrinks'));
            setDrinkData(mealItemsData.drinks);
            setSideItemData(mealItemsData.side);
        }
    }

    const showModal = (itemCat) => {
        if (itemCat == 'drinks') {
            setDataForModal(drinkData);
        } else if (itemCat == 'side') {
            setDataForModal(sideItemData);
        }
        setShowMealModal(true);
    }

    const closeMealModal = async () => {
        setShowMealModal(false);
    }

    const goBack = async () => {
        // localStorage.removeItem('MealPreparingCart');
        // localStorage.removeItem('sidesAndDrinks');

        localStorage.setItem('MealPreparingCart', JSON.stringify(''));
        localStorage.setItem('sidesAndDrinks', JSON.stringify(''));
        router.back();
    }

    const addItem = async (pid, status, image, name, price) => {
        const itemContent = {
            pid: pid,
            name: name,
            image: image,
            price: price,
            status: status,
        };

        setTotalAmount(parseFloat(totalAmount) + parseFloat(price));

        if (status == 'drinks') {
            setThisMealItems(prevState => ({
                ...prevState,
                drink: itemContent,
                tprice: (Number(parseFloat(prevState.tprice) + parseFloat(price)).toFixed(2)),
                sprice: (Number(parseFloat(prevState.sprice) + parseFloat(price)).toFixed(2)),
            }));
            setDrinkCount(1);
        } else if (status == 'side') {
            setThisMealItems(prevState => ({
                ...prevState,
                side: itemContent,
                tprice: (Number(parseFloat(prevState.tprice) + parseFloat(price)).toFixed(2)),
                sprice: (Number(parseFloat(prevState.sprice) + parseFloat(price)).toFixed(2)),
            }));
            setSideItemCount(1);
        }
        setShowMealModal(false);
    }

    const removeItem = async (status, price) => {
        setTotalAmount(parseFloat(totalAmount) - parseFloat(price));
        if (status == 'drinks') {
            setDrinkCount(0);
            setThisMealItems(prevState => ({
                ...prevState,
                drink: {},
                totalBill: (Number(parseFloat(prevState.totalBill) - parseFloat(price)).toFixed(2)),
            }));
        } else if (status == 'side') {
            setSideItemCount(0);
            setThisMealItems(prevState => ({
                ...prevState,
                side: {},
                totalBill: (Number(parseFloat(prevState.totalBill) - parseFloat(price)).toFixed(2)),
            }));
        }
    }

    const mealConfirmed = async () => {
        const cart = JSON.parse(localStorage.getItem('mealCart'));

        if (!cart || cart.length < 1) {
            let newCart = [];
            newCart.push({ ...thisMealItems });
            localStorage.setItem('mealCart', JSON.stringify(newCart));
        } else {
            const mostRecentRecord = cart[cart.length - 1];
            const mostRecentId = mostRecentRecord.id;
            const newId = mostRecentId + 1;

            setChangeId(true);
            setThisMealItems(prevState => ({
                ...prevState,
                id: newId,
            }));

            // console.log(thisMealItems);
            // cart.push({ ...thisMealItems });

            // localStorage.setItem('mealCart', JSON.stringify(cart));
        }

        router.push('/category');

        Swal.fire({
            title: 'ADDED',
            html: `
                <strong><i>Meal Confirmed</i></strong>
            `,
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
        })
    }

    return (
        <>
            <Layout>
                {/* <MealModal closeModal={closeMealModal} /> */}
                {showMealModal && (
                    <MealModal closeModal={closeMealModal} addItem={addItem} data={dataForModal} />
                )}

                <GoBackButton onClick={goBack} />

                <div className="text-2xl font-bold uppercase text-center mt-5 lg:mt-0">Customise Your Meal</div>

                <div className="px-2 flex flex-col flex-1 mt-4 lg:mt-0 pr-4 pl-6 lg:px-16">
                    {thisMealItems.main && (
                        <div className="flex items-center w-full pb-5 lg:px-5 lg:py-5 border-b border-b-gray-300 bg-red gap-4">

                            <div className="product-img">
                                <Image
                                    src={GlobalConfig.siteurl + 'storage/' + thisMealItems.main.image}
                                    height={50}
                                    width={50}
                                    alt={thisMealItems.main.name}
                                    className="w-20 md:w-24"
                                    placeholder='blur'
                                    blurDataURL={`data:image/jpeg;base64,${thisMealItems.main.lqip}`}
                                />
                            </div>

                            <div className="flex flex-col p-0 lg:p-5 justify-center gap-2 flex-1">

                                {/* Name and Price */}
                                <div className="flex justify-between items-center">
                                    <p className="text-xl md:text-3xl font-semibold">{thisMealItems.main.name}<span className="text-xl">{'(' + selectedSize.size + ')'}</span></p>

                                    <p className="text-lg font-bold px-4">Total : {(Number(parseFloat(totalAmount)).toFixed(2))}</p>
                                    {/* <p className="text-lg font-bold px-4">Total : {(Number(parseFloat(totalAmount) + parseFloat(choiceTotalPrice)).toFixed(2))}</p> */}
                                </div>

                                {/* Addons */}
                                {productaddons != null ? (
                                    <div className="flex flex-col gap-4">
                                        {/* <div className="flex w-full items-center justify-center">
                                            <p className="text-lg bg-black text-white rounded-full text-center w-fit px-4 py-2">Selected Addons</p>
                                        </div> */}
                                        <div className="grid grid-cols-3 gap-4">
                                            {productaddons.map((addon, index) => {
                                                return addon.status != 1 ? (
                                                    addon.status === 0 ? (
                                                        <div key={index} className="flex items-center gap-1"><Check size={16} /> No {addon.addon_name}</div>
                                                    ) : (
                                                        <div key={index} className="flex items-center gap-1"><Check size={16} /> Extra {addon.addon_name}</div>
                                                    )
                                                ) : (
                                                    ""
                                                )
                                            })}
                                        </div>
                                    </div>

                                ) : ("")}

                                {/* Choices */}
                                {productChoices != null ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex w-full items-center justify-center gap-3">
                                            <div className=" w-32 border-b border-b-gray-400"></div>
                                            <p className="text-xl font-semibold rounded-full text-center w-fit">Selected Options</p>
                                            <div className=" w-32 border-b border-b-gray-400"></div>
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            {productChoices.map((choice, index) => {
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
                                ) : ("")}
                            </div>

                            {/* Meal Price */}
                            {/* <div className="flex items-center ml-auto bg-red-300">
                                <p className="font-bold">Total : {(Number(parseFloat(totalAmount)).toFixed(2))}</p>
                                <p className="px-2 lg:px-3 py-1 lg:py-2 border bg-teal-800 rounded-sm text-white h-fit font-semibold uppercase">Total Price : £ {(Number(parseFloat(totalAmount)).toFixed(2))}</p>
                            </div> */}
                        </div>
                    )}

                    {thisMealItems.side && thisMealItems.side.image && thisMealItems.side.name && (
                        <div className="flex w-full lg:px-5 border-b border-b-gray-300 justify-between items-center py-3">

                            <div className="flex items-center gap-2">
                                <Image src={GlobalConfig.siteurl + 'storage/' + thisMealItems.side.image} alt={thisMealItems.side.name} className="w-10 md:w-12" height={50} width={50} />
                                <p className="text-base lg:text-xl">{thisMealItems.side.name}</p>
                            </div>

                            {/* Remove Item */}
                            {/* <div className="flex items-center h-fit">
                                <p className="flex items-center px-2 lg:px-3 py-1 lg:py-2 border bg-red-800 rounded-sm text-white h-fit font-semibold uppercase cursor-pointer" onClick={() => removeItem(thisMealItems.side.status, thisMealItems.side.price)}><X className="mr-1" size={14} />Remove</p>

                                <div className="mt-auto font-semibold bg-red-200 p-2 rounded-full cursor-pointer" onClick={() => { removeEntry(ct.id, 'single') }}><Image src={"/assets/images/trash.svg"} width={25} height={25} className="text-lg" /></div>
                            </div> */}

                            <div className="p-2 cursor-pointer px-4" onClick={() => removeItem(thisMealItems.side.status, thisMealItems.side.price)}><Image src={"/assets/images/trash.svg"} width={25} height={25} alt="Delete Icon" /></div>
                        </div>
                    )}

                    {thisMealItems.drink && thisMealItems.drink.image && thisMealItems.drink.name && (
                        <div className="flex w-full lg:px-5 border-b border-b-gray-300 justify-between items-center py-3">
                            <div className="flex items-center gap-2">
                                <Image src={GlobalConfig.siteurl + 'storage/' + thisMealItems.drink.image} alt={thisMealItems.drink.name} className="w-10 md:w-12" height={50} width={50} />
                                <p className="text-base lg:text-xl">{thisMealItems.drink.name}</p>
                            </div>

                            {/* Meal Price */}
                            <div className="p-2 cursor-pointer px-4" onClick={() => removeItem(thisMealItems.drink.status, thisMealItems.drink.price)}><Image src={"/assets/images/trash.svg"} width={25} height={25} alt="Delete Icon" /></div>

                            {/* <div className="flex items-center h-fit">
                                <p className="flex items-center px-2 lg:px-3 py-1 lg:py-2 border bg-red-800 rounded-sm text-white h-fit font-semibold uppercase cursor-pointer" onClick={() => removeItem(thisMealItems.drink.status, thisMealItems.drink.price)}><X className="mr-1" size={14} />Remove</p>
                            </div> */}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-center py-5 mt-2 lg:mt-5 items-center font-semibold gap-3">
                        {drinkCount === 0 && (
                            <button className="flex gap-1 items-center px-4 py-3 rounded-full border border-black focus:bg-black focus:text-white" onClick={() => showModal('drinks')}>
                                <CupSoda size={20} /> Add A Drink
                            </button>
                        )}

                        {sideItemCount === 0 && (
                            <button className="flex gap-1 items-center px-4 py-3 rounded-full border border-black focus:bg-black focus:text-white" onClick={() => showModal('side')}><Croissant size={20} className="mr-1" />Add A Side Item</button>
                        )}

                        {showConfirmButton && (
                            <button className="flex items-center font-semibold px-4 py-3 rounded-full border border-black focus:bg-black focus:text-white" onClick={mealConfirmed}><CheckCircle size={20} className="mr-1" />Confirm Meal</button>
                        )}
                    </div>
                </div >

            </Layout >
        </>
    )
}

export default CustomiseMeal