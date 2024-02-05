import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { AvailableSizes, adminAddProductformControls } from "@/utils";
import React from "react";

const AdminAddNewProduct = () => {


    const handleImage = () => {
        return;
    }

  return (
    <div className="w-full mt-5 mx-0 mb-0 relative">
      <div
        className="flex flex-col items-start justify-start bg-white shadow-2xl
         rounded-xl relative"
      >
        <div className="w-full px-5 mt-6 mx-0 mb-0 space-y-8">
          <input
            type="file"
            max={1000000}
            accept="image/*"
            // onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            <label> Available Sizes</label>
            <TileComponent data={AvailableSizes} />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
              />
            ) : null
          )}
          <button className="inline-flex w-full justify-center bg-black px-6 py-4 text-white
         text-lg font-medium uppsercase tracking-wide">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddNewProduct;
