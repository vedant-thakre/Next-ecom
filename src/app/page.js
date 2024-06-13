// Home.js Final commit before deployment
"use client";
import React, { useContext, useEffect, useState } from "react";
import standGirl_firstbannerhorizontal from "../../public/images/standGirl_firstbannerhorizontal.jpg";
import guyhorizontal_secon_banner from "../../public/images/guyhorizontal_secon_banner.jpg";
import guyvirtical_firstbanner from "../../public/images/guyvirtical_firstbanner.jpeg";
import whitegirl_thirdbannerhorizontal from "../../public/images/whitegirl_thirdbannerhorizontal.png";
import standGirl_firstbannerVirtical from "../../public/images/standGirl_firstbannerVirtical.jpeg";
import whitegirl_thirdbannervirtical from "../../public/images/whitegirl_thirdbannervirtical.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { getAllAdminProducts, productByCategory } from "@/services/product";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: "10",
        width: "20px",
        height: "50px",
        display: "block",
        background: "transparent",
        paddingRight: "70px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: "10",
        width: "20px",
        height: "50px",
        display: "block",
        background: "transparent",
        paddingLeft: "30px",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [expoloreProducts, setexpoloreProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getListOfProducts() {
      const res = await getAllAdminProducts();
      console.log("Response",res);
      if (res?.success) {
        setProducts(res.data);
      }
    }
    getListOfProducts();
  }, []);

  useEffect(() => {
    async function exploreProducts() {
      const res = await productByCategory("men");
      if (res.success) {
        setexpoloreProducts(res.data);
      }
    }
    exploreProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden mb-6  items-center justify-between p-4 md:p-16 lg:p-24">
      <section className="max-w-screen-xl">
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Best Fashion Collection
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
              lacus meleifend menean diverra loremous.
            </p>

            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Explore Shop Collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Explore Shop Collection"
            />
          </div>
        </div>
        <div className="max-w-screen-xl md:px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Summer Sale Collection
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium cursor-pointer uppercase tracking-wide text-white"
                >
                  Shop ALL
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 ml-2 sm:ml-0">
              <Slider {...settings}>
                {products &&
                  products
                    .filter((item) => item.onSale === "yes")
                    .map((productItem) => (
                      <div
                        onClick={() =>
                          router.push(`/product/${productItem._id}`)
                        }
                        className="cursor-pointer"
                        key={productItem._id}
                      >
                        <div className="mr-5">
                          <img
                            src={productItem.imageUrl}
                            alt="Sale Product Item"
                            className={`object-cover w-full ${
                              productItem?.collection !== "none"
                                ? "object-top"
                                : ""
                            } rounded-t-md aspect-square`}
                          />
                        </div>
                        <div className="mt-1  mr-5 p-1">
                          <h5 className="font-normal text-xs text-gray-900">
                            {productItem.name}
                          </h5>
                          <p className="mt-1 text-xs text-gray-800">
                            $ {productItem.price}{" "}
                            <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                          </p>
                        </div>
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
        <div
          className="relative cursor-pointer md:cursor-defaultlg:px-20 mt-10"
          onClick={() => router.push("/collection/new-arrivals")}
        >
          <img
            src={standGirl_firstbannerhorizontal.src}
            className="hidden lg:block w-[100%] h-[auto]"
            alt="New Arrivals"
          />
          <img
            src={standGirl_firstbannerVirtical.src}
            className="block lg:hidden w-[100%] h-[auto]"
            alt="New Arrivals"
          />
          <div className="absolute inset-0 flex gap-2 md:gap-3 lg:gap-5 flex-col items-center justify-end pb-2 md:6 lg:pb-10 p-6">
            <h1 className=" text-white font-bold text-xl  md:text-2xl lg:text-4xl ">
              New Arrivals
            </h1>
            <button
              onClick={() => router.push("/collection/new-arrivals")}
              className="hidden hover:bg-gray-100 lg:block text-black cursor-pointer py-1.5 bg-white font-semibold text-sm px-2"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div
          onClick={() => router.push("/collection/seasonal-sophistication")}
          className="relative lg:px-20 cursor-pointer md:cursor-default  mb-10 text-center mt-10"
        >
          <img
            src={guyhorizontal_secon_banner.src}
            className="hidden lg:block w-[100%] h-[auto]"
            alt="New Arrivals"
          />
          <img
            src={guyvirtical_firstbanner.src}
            className="block lg:hidden w-[100%] h-[auto]"
            alt="New Arrivals"
          />
          <div className="absolute inset-0 flex gap-2 md:gap-3 lg:gap-5 flex-col items-center justify-end pb-2 md:6 lg:pb-10 p-6">
            <h4 className=" text-white font-md tracking-[3px]  text-sm uppercase ">
              New Arrivals
            </h4>
            <h1 className=" text-white font-bold text-xl sm:text-2xl lg:text-4xl ">
              Seasonal Sophistication
            </h1>
            <p className=" text-white font-medium tracking-wider  text-[10px]  ">
              Minimalist layers with clean lines and classic sartorial
              silhouettes.
            </p>
            <button
              onClick={() => router.push("/collection/seasonal-sophistication")}
              className="hidden hover:bg-gray-100 lg:block text-black cursor-pointer py-1.5 bg-white font-semibold text-sm px-2"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className=" hidden lg:block max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">KIDS</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">WOMEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">MEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          onClick={() => router.push("/collection/fresh-feb")}
          className="relative cursor-pointer md:cursor-default lg:px-20 text-center"
        >
          <img
            src={whitegirl_thirdbannerhorizontal.src}
            className="hidden lg:block w-[100%] h-[auto]"
            alt="New Arrivals"
          />
          <img
            src={whitegirl_thirdbannervirtical.src}
            className="block lg:hidden w-[100%] h-[auto]"
            alt="New Arrivals"
          />
          <div className="absolute inset-0 flex gap-0 md:gap-3 lg:gap-4 flex-col items-center justify-end pb-2 md:6 lg:pb-10 p-6">
            <h1 className=" text-white font-bold text-xl  md:text-2xl lg:text-4xl ">
              Fresh Feb !
            </h1>
            <p className="text-white font-small tracking-wider text-[10px] md:text-sm  ">
              Bestseller of the season
            </p>
            <button className="hidden hover:bg-gray-100 md:block text-black cursor-pointer py-1.5 bg-white font-semibold text-sm px-2">
              Shop Now
            </button>
          </div>
        </div>
        <div className=" text-center mt-10 w-full">
          <h1 className=" font-bold text-2xl sm:text-3xl">Explore More</h1>
        </div>
        <div className="grid grid-cols-1 mt-5 item-center gap-4">
          <div className=" col-span-1 lg:py-8">
            <Slider {...settings2}>
              {products &&
                products.map((productItem) => (
                  <div
                    onClick={() => router.push(`/product/${productItem._id}`)}
                    className="cursor-pointer "
                    key={productItem._id}
                  >
                    <div className="mr-5">
                      <img
                        src={productItem.imageUrl}
                        alt="Sale Product Item"
                        className={`object-cover ${
                          productItem?.collection !== "none" ? "object-top" : ""
                        } h-[160px] w-full rounded-t-md`}
                      />
                    </div>
                    <div className="mt-1  mr-5 p-1">
                      <h5 className="font-normal text-xs text-gray-900">
                        {productItem.name}
                      </h5>
                      <p className="mt-1 text-xs text-gray-800">
                        $ {productItem.price}{" "}
                        <span className="text-red-700">
                          {productItem.onSale === "yes"
                            ? `(-${productItem.priceDrop}%) Off`
                            : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </main>
  );
}
