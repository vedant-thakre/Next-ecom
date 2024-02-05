
// add a new product

import Cookies from "js-cookie";

export const addNewProduct = async (formdata) => {
  try {
    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};