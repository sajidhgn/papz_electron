"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoBackButton } from "../../components/goBackButton";
import Layout from "../../components/layout";
import { ProductsByCategory } from '../../../lib/ProductsByCategory';
import FriesLottieAnimation from '../../components/FriesLottieAnimation';
import Sidebar from '../../components/sidebar/sidebar';
import ProductsGrid from '../../components/productsGrid'

const ProductFromCategory = () => {

    const router = useRouter();
    const { catid } = router.query;

    const [data, setData] = useState(null);
    const [category, SetCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ProductError, setProductError] = useState(false);
    const [ProductErrorMessage, setProductErrorMessage] = useState();

    useEffect(() => {

        const branch = JSON.parse(localStorage.getItem('branch'));
        if (!catid) return;

        const fetchData = async () => {
            setLoading(true);
            setData(null);
            try {
                const fetchedData = await ProductsByCategory(catid, branch);
                if (!fetchedData.status) {
                    setProductError(true);
                    setProductErrorMessage(fetchedData.message);
                } else {
                    setProductError(false)
                    setData(fetchedData.product);
                }
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const pcat = localStorage.getItem('ProductCategories');
        SetCategory(JSON.parse(pcat));
        localStorage.setItem('productDetailsFetchStatus', JSON.stringify(true));
    }, [catid]);

    return (
        <>
            {loading ? (
                <div className="w-full min-h-screen flex flex-col justify-center items-center text-slate-800">
                    <FriesLottieAnimation />
                    {/* <p className='text-lg font-semibold mt-1 uppercase'>Slicing and dicing the best options for you...</p> */}
                </div>
            ) : (
                <Layout>
                    <div className="flex w-full flex-1 pb-36">
                        <div className="w-1/5">
                            <Sidebar data={category} />
                        </div>

                        <div className="w-4/5 flex flex-col">

                            <GoBackButton title="Main Menu"
                                onClick={() => router.push('/category')} />

                            {ProductError && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p>{ProductErrorMessage}</p>
                                </div>
                            )}

                            {data && (
                                <ProductsGrid gridData={data} flag={1} />
                            )}
                        </div>
                    </div>
                </Layout>
            )}
        </>
    )
}

// export const getStaticPaths = async () => {
//     const categories = await getAllCategories();
//     const paths = categories.map((cat) => ({
//         params: { catid: cat.id.toString() },
//     }))

//     return { paths, fallback: false }
// }

// export const getStaticProps = async (context) => {
//     const cid = context.params.catid;
//     const data = await ProductsByCategory(cid);
//     if (!data) return { notFound: true, }

//     return {
//         props: {
//             data
//         },
//     }
// }

export default ProductFromCategory