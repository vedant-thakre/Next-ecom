"use client";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const ProductButtons = ({item}) => {
  const pathName = usePathname();

  const {
    setCurrentUpdatedProduct,
    user,
    showCartModal,
    setShowCartModal,
    componentLoader,
    setComponentLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");


  const handleDeleteProduct = async(item) => {
    setComponentLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
      setComponentLoader({ loading: false, id: "" });
    }
  }

  const handleAddToCart = async(getItem) => {
    setComponentLoader({ loading: true, id: getItem._id });

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

    console.log(res);
  }


  return isAdminView ? (
    <>
      <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 
      text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 
      text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => {
          handleDeleteProduct(item);
        }}
      >
        {componentLoader &&
        componentLoader.loading &&
        item._id === componentLoader.id ? (
          <ComponentLoader
            color={"#ffffff"}
            loading={componentLoader && componentLoader.loading}
          />
        ) : (
          "Delete"
        )}
      </button>
    </>
  ) : (
    <button
      className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium
        uppercase tracking-wide text-white"
      onClick={() => handleAddToCart(item)}
    >
      {componentLoader &&
      componentLoader.loading &&
      item._id === componentLoader.id ? (
        <ComponentLoader
          color={"#ffffff"}
          loading={componentLoader && componentLoader.loading}
        />
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default ProductButtons;
