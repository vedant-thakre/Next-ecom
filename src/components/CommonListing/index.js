"use client";
import React from "react";
import ProductTile from "./ProductTile";
import ProductButtons from "./ProductButtons";

const dummyData = [
    {
        _id : "65c1ddc24d60ab8278ae2916",
        name : "Asthetic Shirt",
        description : "Minimal looking Sweatshirt",
        price : 799,
        category : "men",
        sizes : [
            {
                id: "s",
                label: "S",
            },
        ],
        deliveryInfo: "COD available",
        onSale : "yes",
        priceDrop : 15,
        imageUrl : "https://firebasestorage.googleapis.com/v0/b/next-ecom-a921e.appspot.com/o/ecommerce%2F21.jpeg-1707203452816-ijf3p46h08?alt=media&token=2d069643-87c2-4127-ae14-d9f889192277",
    },
]

const CommonListing = () => {
  return (
    <section className="bg-white py-12 sm:py-16 " >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                {
                    dummyData && dummyData.length ?
                    dummyData.map((item) => (
                        <article key={item._id} >
                            <ProductTile item={item} />
                            <ProductButtons item={item} />
                        </article>
                    ))
                    : null
                }
            </div>
        </div>
    </section>
  );
};

export default CommonListing;
