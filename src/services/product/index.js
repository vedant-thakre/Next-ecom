import axios from "axios";
import Cookies from "js-cookie";

// Add a new product
export const addNewProduct = async (formData) => {
  try {
    const res = await axios.post("/api/admin/add-product", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all products
export const getAllAdminProducts = async () => {
  try {
    const res = await axios.get(
      `https://urbanmarket.vercel.app/api/admin/all-products`,
      // `http://localhost:3000/api/admin/all-products`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    console.log("res --> ",res)

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Update a product
export const updateAProduct = async (formData) => {
  try {
    const res = await axios.put("/api/admin/update-product", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete a product
export const deleteAProduct = async (id) => {
  try {
    const res = await axios.delete(`/api/admin/delete-product?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get products by category
export const productByCategory = async (id) => {
  try {
    const res = await axios.get(
      `https://urbanmarket.vercel.app/api/admin/product-by-category?id=${id}`,
      // `http://localhost:3000/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
// Get products by category
export const productByCategory2 = async (id) => {
  try {
    const res = await axios.get(
      `/api/admin/product-by-category?id=${id}`,
      // `http://localhost:3000/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get products by collection
export const productByCollection = async (id) => {
  try {
    const res = await axios.get(
      `https://urbanmarket.vercel.app/api/collection?id=${id}`,
      // `http://localhost:3000/api/collection?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
// Get products by collection
export const productByCollection2 = async (id) => {
  try {
    const res = await axios.get(
      `/api/collection?id=${id}`,
      // `http://localhost:3000/api/collection?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Products by sale
export const productBySale = async (id) => {
  try {
    const res = await axios.get(
      `https://urbanmarket.vercel.app/api/admin/on-sale?id=${id}`,
      // `http://localhost:3000/api/admin/on-sale?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get product by ID
export const productById = async (id) => {
  try {
    const res = await axios.get(
      `https://urbanmarket.vercel.app/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
