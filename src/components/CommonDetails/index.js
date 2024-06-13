"use client";

import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Notification from "../Notification";
import ComponentLoader from "../Loader/ComponentLoader";
import { addToCart } from "@/services/cart";
import { MdOutlineShoppingCart } from "react-icons/md";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { productByCategory, productByCollection } from "@/services/product";

const settings2 = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
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

export default function CommonDetails({ item }) {
  const { setComponentLoader, componentLoader, user, setShowCartModal } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();  

  async function handleAddToCart(getItem) {
    setComponentLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message);
      setComponentLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message);
      setComponentLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  const randomIndex = Math.floor(Math.random() * (products.length - 4)) + 4;
  console.log("item -->", item);

  useEffect(() => {
    async function getListOfProducts() {
      if (item.collection !== "none") {
        const res = await productByCollection(item.collection);
        console.log("You make like if", res);
        if (res?.success) {
          setProducts(res.data);
        }
      } else {
        const res = await productByCategory(item.category);
        console.log("You make like else", item.category);
        if (res?.success) {
          setProducts(res.data);
        }
      }
    }
    getListOfProducts();
  }, [item]);

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 mb-16 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item?.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item && item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item?.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {item && item.name}
            </h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end gap-4">
                {item?.onSale === "yes" ? (
                  <h1 className="text-3xl font-bold text-red-700">{`$ ${(
                    item?.price -
                    item?.price * (item.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
                <h1
                  className={`font-bold mr-2 ${
                    item?.onSale === "yes"
                      ? "line-through text-2xl text-gray-400"
                      : "text-3xl"
                  }`}
                >
                  $ {item && item.price}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide text-white"
              >
                {componentLoader && componentLoader.loading ? (
                  <ComponentLoader
                    text={"Adding to Cart"}
                    color={"#ffffff"}
                    loading={componentLoader && componentLoader.loading}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MdOutlineShoppingCart />
                    <p className=" font-medium">Add</p>
                  </div>
                )}
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {item && item.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {"Cancel anytime"}
              </li>
            </ul>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </a>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">
                {item && item.description}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-2 font-bold text-2xl uppercase text-gray-900">
          <h1>You May Also Like</h1>
        </div>
        <div className="w-full my-5 h-[1px] bg-gray-500"></div>
        <div className="flex w-full overflow-hidden">
          {products &&
            products
            .slice(randomIndex-4, randomIndex)
            .map((productItem) => (
              <div
                onClick={() => router.push(`/product/${productItem._id}`)}
                className="cursor-pointer"
                key={productItem._id}
              >
                <div className="mr-5">
                  <img
                    src={productItem.imageUrl}
                    alt="Sale Product Item"
                    className={`object-cover h-[180px]  ${
                      productItem.collection !== "none" ? "object-top" : ""
                    } rounded-t-md w-full aspect-video`}
                  />
                </div>
                <div className="mt-1  mr-5 p-1">
                  <h5 className="font-normal text-xs text-gray-900">
                    {productItem.name}
                  </h5>
                  <p className="mt-1 text-xs text-gray-800">
                    $ {productItem.price}{" "}
                    {productItem.onSale === "yes" ? (
                      <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Notification />
    </section>
  );
}
