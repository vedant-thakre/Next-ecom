import axios from "axios";
import Cookies from "js-cookie";

// Create a new order
export const createNewOrder = async (formData) => {
  try {
    const res = await axios.post("/api/order/create-order", formData, {
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

// Get all the orders for a user
export const getAllOrdersForUser = async (id) => {
  try {
    const res = await axios.get(`/api/order/get-all-orders?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get order details
export const getOrderDetails = async (id) => {
  try {
    const res = await axios.get(`/api/order/order-details?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all the orders from the database
export const getAllOrdersForAllUsers = async () => {
  try {
    const res = await axios.get("/api/admin/orders/get-all-orders", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Update the status of an order
export const updateStatusOfOrder = async (formData) => {
  try {
    const res = await axios.put("/api/admin/orders/update-order", formData, {
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
