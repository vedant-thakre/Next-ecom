import Cookies from "js-cookie";

// Add a new product
export const addNewProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Get all products
export const getAllAdminProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/all-products", {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Update a product
export const updateAProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Delete a product
export const deleteAProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Get products by category
export const productByCategory = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Get products by collection
export const productByCollection = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/collection?id=${id}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Products by sale
export const productBySale = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/on-sale?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Get product by ID
export const productById = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
