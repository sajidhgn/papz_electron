import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductDetailTemplate from './_components/ProductDetailTemplate';
import { getProductDetails } from '@/lib/getProductDetails';
import { GoBackButton } from "@/components/goBackButton";
import Layout from '@/components/layout';
import FriesLottieAnimation from '@/components/FriesLottieAnimation';

const ProductDetail = () => {

    const router = useRouter();
    const { pid } = router.query;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pid) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedData = await getProductDetails(pid);
                if (!fetchedData) {
                    setError('No data found');
                } else {
                    setData(fetchedData);
                    setError(null);
                }
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pid]);
    return (
        <>
            {loading ? (
                <div className="w-full min-h-screen flex flex-col justify-center items-center text-slate-800">
                    <FriesLottieAnimation />
                    {/* <p className='text-lg font-semibold mt-1 uppercase'>Hang tight, we're refining your dish...</p> */}
                </div>
            ) : (
                <Layout>
                    <GoBackButton />
                    {error && (
                        <div className="w-full flex-grow flex items-center justify-center">
                            <p>{error}</p>
                        </div>
                    )}

                    {data && (
                        <ProductDetailTemplate
                            pDetail={data}
                            addons={data.addons?.length > 0 ? data.addons : []}
                            sizes={data.sizes?.length > 0 ? data.sizes : []}
                            choices={data.choices?.length > 0 ? data.choices : []}
                        />
                    )}
                </Layout>
            )}
        </>
    )
}

// export const getStaticPaths = async () => {
//     const products = await getAllProducts();
//     const paths = products.map((post) => ({
//         params: { pid: post.id.toString() },
//     }))

//     return { paths, fallback: false }
// }

// export const getStaticProps = async (context) => {
//     const pid = context.params.pid;
//     const data = await getProductDetails(pid);
//     if (!data) return { notFound: true, };
//     return {
//         props: {
//             data
//         },
//     }
// }

export default ProductDetail