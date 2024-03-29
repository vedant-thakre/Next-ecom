"use client";


import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { DecrementItemQuantity, IncrementItemQuantity, deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    user,
    setCartItems,
    cartItems,
    pageLoader,
    setpageLoader,
    setComponentLoader,
    componentLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    setpageLoader(true);
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item?.productID,
                price:
                  item?.productID?.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item?.productID?.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      setpageLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }

  const handleDecrement = async (item) => {
    if (item.quantity === 1) {
      handleDeleteCartItem(item._id);
    } else {
      const res = await DecrementItemQuantity({
        id: item._id,
      });

    

      if (res.success) {
        setComponentLoader({ loading: false, id: "" });
        extractAllCartItems();
      } else {
        toast.error(res.message);
        setComponentLoader({ loading: false, id: getCartItemID });
      }
    }
  };

  const handleIncrement = async (item) => {
    const res = await IncrementItemQuantity({
      id: item._id,
    });

    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      extractAllCartItems();
    } else {
      toast.error(res.message);
      setComponentLoader({ loading: false, id: getCartItemID });
    }
  };  

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {

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
    <CommonCart
      componentLoader={componentLoader}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
}
