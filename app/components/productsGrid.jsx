import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GlobalConfig } from '@/app.config'

const ProductsGrid = (props) => {

  const mainClass = props.flag == 1 ? "pt-6" : ""
  return (

    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${mainClass}`}>
        {props.gridData.map((cat, index) => (
          <Link key={index} href={props.flag === 0 ? `category/${cat.id}` : `/products/${cat.id}`} className="parent flex flex-col items-center mb-8">

            <Image src={GlobalConfig?.siteurl + 'storage/' + cat.image} className="w-36 lg:w-64 object-contain aspect-square" alt={cat.name + " Image"}
              width={50}
              height={50}
            // placeholder='blur'
            // blurDataURL={`data:image/jpeg;base64,${props.imgPlaceholder}`}
            />

            <p className="text-center text-xl lg:text-3xl">
              {cat.name}
            </p>

          </Link>
        ))}

        {props.flag === 0 && (
          <Link href={'/deals'} className="parent flex flex-col items-center mb-8">

            <Image src={'/assets/images/deals.png'} className="w-36 lg:w-64 object-contain aspect-square" alt={"Deals Image"}
              width={50}
              height={50}
            />

            <p className="text-center text-xl lg:text-3xl">
              Deals
            </p>

          </Link>
        )}

      </div>

      {/* <div className={`flex-1 p-2 grid overflow-y-auto ${mainClass}`}>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {props.gridData.map((cat, index) => (
            <div key={index}>
              <ProductsGridChild imgPath={cat.image} imgPlaceholder={cat.lqip} width={500} height={500} title={cat.name} cat_id={cat.id} slug={cat.slug} sideBarStatus={true} href={props.flag === 0 ? `category/${cat.id}` : `/products/${cat.id}`} />
            </div>
          ))}

          {props.flag === 0 && (
            <div className="border-none h-fit mb-9 flex justify-center">
              <Link href={'/deals'}>
                <div className="w-fit">
                  <div className="card-img-top flex justify-center">
                    <Image src={GlobalConfig.siteurl + 'assets/images/fried-chicken-bucket.png'} className="w-28 lg:w-56 object-contain" alt={"props.altText"}
                      width={50}
                      height={50}
                    />
                  </div>

                  <div className="px-3">
                    <p className="mt-1 text-center text-lg lg:text-xl md:mt-2">
                      Deals
                    </p>
                  </div>

                </div>
              </Link>
            </div>
          )}
        </div>

      </div> */}
    </>
  )
}

export default ProductsGrid