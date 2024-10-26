"use client";
import { getAllCategories } from '../../../lib/getAllCategories';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import { Quote, RotateCcw, ChevronsRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FriesLottieAnimation from '../../components/FriesLottieAnimation';
import Sidebar from "../../components/sidebar/sidebar";
import ProductsGrid from "../../components/productsGrid";
import Link from 'next/link';
import Image from 'next/image';

const CategoryPage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [catError, setCatError] = useState(false);
    const [catErrorMessage, setCatErrorMessage] = useState();
    const [category, setCategory] = useState([]);
    const [categoryError, setCategoryError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [totalBill, setTotalBill] = useState(0);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const branch = JSON.parse(localStorage.getItem('branch'));
            const data = await getAllCategories(branch);
            setLoading(false);
            console.log(branch);
            if (!data.status) {
                setCatError(true);
                setCatErrorMessage(data.message);
            } else {
                setCatError(false);
                setCategory(data.cat);
                localStorage.setItem('ProductCategories', JSON.stringify(data.cat));
            }
        };

        getCategories();

        localStorage.removeItem('MealPreparingCart');
        localStorage.removeItem('sidesAndDrinks');
        // setCategory(props.categories);
        // let categories = props.categories;
        // localStorage.setItem('categories', JSON.stringify(categories));
        cartStateInitialization();
    }, [])

    const cartStateInitialization = () => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            const cartArray = [];
            localStorage.setItem('cart', JSON.stringify(cartArray));
            localStorage.setItem('totalBill', JSON.stringify(0));
        } else {
            // const CartNow = JSON.parse(localStorage.getItem('cart'));

            // Setting the total price
            let total = 0;
            let cartCount = 0;
            for (let index = 0; index < cart.length; index++) {
                const element = cart[index];
                const itemTotal = parseFloat(element.tprice);
                total += itemTotal;
                const itemQuantity = parseInt(element.quantity, 10);
                cartCount += itemQuantity;
            }
            total = parseFloat(total.toFixed(2));
            setTotalBill(total);
            localStorage.setItem('totalBill', JSON.stringify(total));

            // Setting the total items
            setCartCount(cartCount);
        }

        const customMeal = JSON.parse(localStorage.getItem('mealCart'));
        if (customMeal) {
            let total = 0;
            let cartCount = 0;
            for (let index = 0; index < customMeal.length; index++) {
                const element = customMeal[index];
                total += parseFloat(element.tprice);
                cartCount += parseInt(element.quantity);
            }
            setTotalBill(prevTotalBill => prevTotalBill + total);
            setCartCount(prevCartCount => prevCartCount + cartCount);
        }

        const deals = JSON.parse(localStorage.getItem('dealsCart'));
        if (deals) {
            let total = 0;
            let cartCount = 0;
            for (let index = 0; index < deals.length; index++) {
                const element = deals[index];
                total += parseFloat(element.tprice);
                cartCount += parseInt(element.quantity);
            }
            setTotalBill(prevTotalBill => prevTotalBill + total);
            setCartCount(prevCartCount => prevCartCount + cartCount);
        }
    }

    const resetCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.removeItem('mealCart');
        localStorage.removeItem('dealsCart');
        setCartCount(0);
        setTotalBill(0);
    }

    const handleRefresh = () => {
        router.reload();
    };

    return (

        <>
            {loading ? (
                <div className="w-full min-h-screen flex flex-col justify-center items-center text-slate-800">
                    <FriesLottieAnimation />
                    {/* <p className='text-lg font-semibold mt-1 uppercase'>Stirring up some great choices for you...</p> */}
                </div>
            ) : (
                catError ? (
                    <div className="w-full text-center flex flex-col justify-center items-center min-h-screen px-20">
                        <div className="text-6xl font-bold text-red-400">OOPPSS</div>
                        <div className="text-lg mt-1 font-semibold">{catErrorMessage}</div>
                        <div className="text-lg mt-3 flex items-center bg-slate-200 text-slate-800 font-semibold px-2 rounded-sm cursor-pointer w-max" onClick={() => router.push('/')}>
                            <RotateCcw size={14} className="mr-1" /> RETRY
                        </div>
                    </div>
                ) : (
                    <Layout>
                        <div className="flex-1 flex flex-col">
                            {catError ? (
                                <div className="w-full text-center mt-40 flex flex-col items-center bg-red-300">
                                    <div className="text-6xl font-bold text-red-400">OOPPSS</div>
                                    <div className="text-lg mt-1 font-semibold">{catErrorMessage}</div>
                                    <div className="text-lg mt-3 flex items-center bg-slate-200 text-slate-800 font-semibold px-2 rounded-sm cursor-pointer w-max" onClick={handleRefresh}>
                                        <RotateCcw size={14} className="mr-1" /> RETRY
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {categoryError ? (
                                        <div className="flex justify-center flex-1 p-2 text-lg italic">
                                            {categoryError}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex w-full flex-1 pb-20">
                                                <div className="w-1/5">
                                                    <Sidebar data={category} />
                                                </div>

                                                <div className="w-4/5 pt-10">
                                                    <ProductsGrid gridData={category} flag={0} />
                                                </div>
                                            </div>


                                            <div className="flex items-center w-full justify-between px-8 py-5 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.1)] fixed bottom-0">
                                                <div className="text-xl">Total : <span className='font-semibold'>{totalBill.toFixed(2)}</span></div>

                                                <div className="text-base px-3 py-1 bg-gray-900 text-white flex items-center gap-1 cursor-pointer" onClick={resetCart}>Start Over</div>

                                                <Link href={'/cart'} className="relative text-lg flex items-center gap-1 font-semibold cursor-pointer">
                                                    View Cart
                                                    <div className="relative">
                                                        <Image src={"/assets/images/shoppingCart.svg"} width={22} height={22} className="text-lg" />
                                                        <span className="absolute top-[-6px] right-[-8px] bg-gray-900 h-4 w-4 rounded-full text-white text-xs flex items-center justify-center">{cartCount}</span>
                                                    </div>
                                                </Link>
                                            </div>

                                            {/* <div className="flex flex-col justify-center pb-0 bg-white fixed w-full bottom-0 font-semibold text-center text-md">

                                            <div className="py-2 lg:py-4 px-10 bg-fuchsia-800 text-white flex justify-between">
                                                <div>My Order</div>
                                                <button className="flex items-center" onClick={resetCart}><RotateCcw size={14} className="mr-1" />Start Over</button>
                                            </div>

                                            <div className="flex flex-col lg:flex-row border border-gray-300 justify-between items-center py-2 lg:py-6 lg:px-4 m-3">
                                                <div className="px-5 text-md lg:text-xl" style={{ fontFamily: "system-ui" }}>
                                                    Total : £ {totalBill.toFixed(2)} |{" "}
                                                    <span className="uppercase ml-1">Items</span>
                                                    <span className="text-3xl mx-2" style={{ fontFamily: "initial" }}>
                                                        {cartCount}
                                                    </span>
                                                </div>

                                                <Link href={"/cart"} className="flex mb-1 lg:mb-0 items-center">
                                                    <div className="">
                                                        View My Order
                                                    </div>
                                                    <div className="px-2">
                                                        <ChevronsRight size={15} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div> */}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Layout>
                )
            )}
        </>
    )
}

// export const getStaticProps = async () => {
//     const data = await getAllCategories();
//     return {
//         props: { data }
//     }
// }

export default CategoryPage