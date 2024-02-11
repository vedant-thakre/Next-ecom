"use client";
import React, { useEffect } from "react";
import ProductTile from "./ProductTile";
import ProductButtons from "./ProductButtons";
import { useRouter } from "next/navigation";
import Notification from "../Notification";


const CommonListing = ({data}) => {

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [])
  

  return (
    <section className="bg-white py-12 sm:py-16 ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid px-1 sm:px-0 grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButtons item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListing;
