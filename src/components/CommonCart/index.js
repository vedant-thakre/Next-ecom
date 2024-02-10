"use client";

import { useRouter } from "next/navigation";
import ComponentLoader from "../Loader/ComponentLoader";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  handleIncrement,
  handleDecrement,
  componentLoader,
}) {
  const router = useRouter();
  let Shipping = null;
  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="-my-8">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        key={cartItem.id}
                      >
                        <div className="shrink-0">
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className={`h-24 w-40 rounded-lg object-cover ${
                              cartItem.productID.collection !== "none"
                                ? "object-top"
                                : ""
                            }`}
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                              <div className="flex gap-2 mt-1 items-center">
                                <button
                                  onClick={() => handleIncrement(cartItem)}
                                  className="w-4 h-4 border border-gray-400 cursor-pointer rounded-full flex items-center justify-center"
                                >
                                  <FaPlus className="text-[12px] text-gray-700" />
                                </button>
                                <p className="text-sm text-black">
                                  {cartItem && cartItem.quantity}
                                </p>
                                <button
                                  onClick={() => handleDecrement(cartItem)}
                                  className="w-4 h-4 border cursor-pointer border-gray-400 rounded-full flex items-center justify-center"
                                >
                                  <FaMinus className="text-[12px] text-gray-700" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                $
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price * cartItem.quantity}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-yellow-700 sm:order-2"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLoader &&
                                componentLoader.loading &&
                                componentLoader.id === cartItem._id ? (
                                  <ComponentLoader
                                    text={"Removing"}
                                    color={"#0000000"}
                                    loading={
                                      componentLoader && componentLoader.loading
                                    }
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">
                    {"Your cart is Empty :( "}
                  </h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-black font-semibold">
                    {`$ ${
                      cartItems && cartItems.length
                        ? cartItems.reduce(
                            (total, item) =>
                              item.productID.price * item.quantity + total,
                            0
                          )
                        : "0"
                    }`}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg text-gray-400 font-semibold">
                    $
                    {`${
                      cartItems && cartItems.length
                        ? cartItems.reduce(
                            (total, item) =>
                              item.productID.price * item.quantity + total,
                            0
                          ) >= 1000 &&
                          cartItems.reduce(
                            (total, item) =>
                              item.productID.price * item.quantity + total,
                            0
                          ) < 2000
                          ? (Shipping = 10)
                          : cartItems.reduce(
                              (total, item) =>
                                item.productID.price * item.quantity + total,
                              0
                            ) >= 2000
                          ? (Shipping = 0)
                          : (Shipping = 15)
                        : "0"
                    }`}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg text-black font-semibold">
                    {`$ ${
                      cartItems && cartItems.length
                        ? cartItems.reduce(
                            (total, item) =>
                              item.productID.price * item.quantity + total,
                            0
                          ) + (Shipping || 0)
                        : "0"
                    }`}
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={cartItems && cartItems.length === 0}
                    className="disabled:opacity-50 group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
