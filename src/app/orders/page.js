"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLoader,
    setpageLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setpageLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res.success) {
      setpageLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message);
    } else {
      setpageLoader(false);
      toast.error(res.message);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);



  if (pageLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex">
                          <h1 className="text-md mb-3 flex-1">
                            #order: {item._id}
                          </h1>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total paid amount
                            </p>
                            <p className="mr-3 text-2xl  font-semibold text-gray-900">
                              ${item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0">
                              <img
                                alt="Order Item"
                                className={`h-24 w-36 rounded-lg object-cover ${
                                  orderItem.product.collection !== "none"
                                    ? "object-top"
                                    : ""
                                }`}
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            {item.isProcessing ? "Processing" : "Delivered"}
                          </button>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            View Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <section className="h-[90vh] bg-gray-200">
                    <div className="">
                      <div className="max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
                        <div className="bg-white shadow">
                          <div className=" py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                            <h1 className="font-bold text-lg">
                              {`You don't have any orders :( `}
                            </h1>
                            <button
                              type="button"
                              className="font-medium text-grey"
                              onClick={() => {
                                router.push("/product/listing/all-products");
                              }}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
