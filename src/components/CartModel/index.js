"use client";

import { Fragment, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModel";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import ComponentLoader from "../Loader/ComponentLoader";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    componentLoader,
    setComponentLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  const extractAllCartItems = async () => {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }

    console.log(res);
  };

  useEffect(() => {
    if (user !== null) {
      extractAllCartItems();
    }
  }, [user]);

    const handleDeleteCartItem = async (getCartItemID) =>  {

      setComponentLoader({ loading: true, id: getCartItemID });
      const res = await deleteFromCart(getCartItemID);

      if (res.success) {
        setComponentLoader({ loading: false, id: "" });
        toast.success(res.message);
        extractAllCartItems();
      } else {
        toast.error(res.message);
        setComponentLoader({ loading: false, id: getCartItemID });
      }
    }

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.name}
                        </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      $
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.price}
                    </p>
                    <div className="flex gap-2 mt-1 items-center">
                      <button className="w-4 h-4 border border-gray-400 cursor-pointer rounded-full flex items-center justify-center">
                        <FaPlus className="text-[12px] text-gray-700" />
                      </button>
                      <p className="text-sm text-black">
                        {cartItem && cartItem.quantity}
                      </p>
                      <button className="w-4 h-4 border cursor-pointer border-gray-400 rounded-full flex items-center justify-center">
                        <FaMinus className="text-[12px] text-gray-700" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2"
                      onClick={() => handleDeleteCartItem(cartItem._id)}
                    >
                      {componentLoader &&
                      componentLoader.loading &&
                      componentLoader.id === cartItem._id ? (
                        <ComponentLoader
                          text={"Removing"}
                          size={7}
                          color={"#000000"}
                          loading={componentLoader && componentLoader.loading}
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go To Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button 
                type="button" 
                className="font-medium text-grey"
                onClick={()=> {
                    router.push("/");
                    setShowCartModal(false);
                }}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
