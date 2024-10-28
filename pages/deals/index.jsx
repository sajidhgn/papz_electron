import { getDealItems } from '@/lib/getDealItems'
import { useEffect, useState } from 'react'
import { GoBackButton } from "@/components/goBackButton"
import Layout from '@/components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { GlobalConfig } from '@/app.config'
import Sidebar from '@/components/sidebar/sidebar'
import { useRouter } from 'next/navigation';

const Deals = () => {
    const router = useRouter();
    const [dealItems, setDealItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDealItems();
                setDealItems(data);
                localStorage.setItem('allDeals', JSON.stringify(data));
                console.log(data);

                const pcat = localStorage.getItem('ProductCategories');
                setCategory(JSON.parse(pcat));
            } catch (error) {
                console.error('Error fetching deal items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Layout>
                <div className="flex w-full flex-1 pb-36">
                    <div className="w-1/5">
                        <Sidebar data={category} />
                    </div>

                    <div className="w-4/5 flex flex-col">
                        <GoBackButton title="Main Menu"
                            onClick={() => router.push('/category')} />

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : dealItems && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {dealItems.map((cat, index) => (
                                    <div key={index}>
                                        <Link href={`deals/${cat.id}`} className="flex flex-col items-center mb-8">
                                            <Image src={GlobalConfig.siteurl + 'storage/' + cat.deal_image} className="w-36 lg:w-64 object-contain aspect-square" alt={cat.deal_name + " Image"}
                                                width={50}
                                                height={50}
                                            // placeholder='blur'
                                            // blurDataURL={`data:image/jpeg;base64,${props.imgPlaceholder}`}
                                            />

                                            <div className="flex flex-col items-center">
                                                <p className="text-center text-xl lg:text-3xl">
                                                    {cat.deal_name}
                                                </p>

                                                <p className="text-center text-base">
                                                    {cat.description}
                                                </p>
                                            </div>

                                        </Link>
                                        {/* <ProductsGridChild imgPath={cat.deal_image} width={500} height={500} title={cat.deal_name} cat_id={cat.id} href={`deals/${cat.id}`} folderName='assets' /> */}
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Deals