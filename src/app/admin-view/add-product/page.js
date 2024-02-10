"use client";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const AdminAddNewProduct = () => {
  const [formData, setFormData] = useState(initialFormData);
  const {
    componentLoader,
    setComponentLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (currentUpdatedProduct !== null) {
      setFormData(currentUpdatedProduct);
    }
  }, [currentUpdatedProduct]);

  async function handleImage(e) {
    const file = e.target.files[0];

    if (file) {
      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];

      if (allowedFormats.includes(file.type)) {
        const extractImageUrl = await helperForUPloadingImageToFirebase(file);

        if (extractImageUrl !== "") {
          setFormData({
            ...formData,
            imageUrl: extractImageUrl,
          });
        }
      } else {
        console.error(
          "Invalid image format. Please select a JPEG, PNG, JPG or WEBP file."
        );
      }
    }
  }


  function handleTileClick(getCurrentItem) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  const handleAddProduct = async () => {
    setComponentLoader({ loading: true, id: "" });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);  

    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      toast.error(res.message);
      setComponentLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  };

  return (
    <div className="w-full mt-5 mx-0 mb-0 relative">
      <div
        className="flex flex-col items-start justify-start bg-white shadow-2xl
         rounded-xl relative"
      >
        <div className="w-full px-5 pb-5 mt-6 mx-0 mb-0 space-y-8">
          <input
            type="file"
            max={1000000}
            accept="image/*"
            onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            <label> Available Sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={formData[controlItem.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
              />
            ) : null
          )}
          <button
            className="inline-flex w-full justify-center bg-black px-6 py-4 text-white
         text-lg font-medium uppsercase tracking-wide"
            onClick={handleAddProduct}
          >
            {componentLoader && componentLoader.loading ? (
              <ComponentLoader
                loading={componentLoader && componentLoader.loading}
                color={"#ffffff"}
              />
            ) : (
              currentUpdatedProduct !== null ? "Update Product" : "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
