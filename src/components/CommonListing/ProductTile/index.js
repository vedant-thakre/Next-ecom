"use client"
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const ProductTile = ({ item }) => {
    const router = useRouter();
    const pathName = usePathname();
    const isSalePage = pathName.includes("sale");
  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
        <img
          src={item.imageUrl}
          alt="Product Image"
          className={`h-full w-full object-cover ${item?.collection !== "none" ? 'object-top': ""} transition-all duration-300 group-hover:scale-125`}
        />
      </div>
      {item.onSale == "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p
            className={` bg-red-600 ${
              isSalePage ? `text-[9px]` : "text-[8px]"
            } font-bold uppercase tracking-wide text-white sm:py-1 sm:px-2`}
          >
            {isSalePage ? `-${item.priceDrop}%` : "Sale"}
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between ">
        <div className="mb-2 flex">
          {item.onSale === "yes" ? (
            <>
              <p className="mr-3 text-sm font-semibold ">{`$ ${(
                item.price -
                item.price * (item.priceDrop / 100)
              ).toFixed(2)}`}</p>
              <p
                className={`mr-3 text-sm font-semibold ${
                  item.onSale === "yes" ? "line-through text-gray-500" : ""
                }`}
              >{`$ ${item.price}`}</p>
            </>
          ) : (
            <p
              className={`mr-3 text-sm font-semibold ${
                item.onSale === "yes" ? "line-through text-gray-500" : ""
              }`}
            >{`$ ${item.price}`}</p>
          )}
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold text-red-700">{`-(${item.priceDrop}%)off`}</p>
          ) : null}
        </div>
        <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </div>
  );
};

export default ProductTile;