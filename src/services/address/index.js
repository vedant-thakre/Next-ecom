import axios from "axios";
import Cookies from "js-cookie";

// Add New Address
export const addNewAddress = async (formData) => {
  try {
    const res = await axios.post("/api/address/add-new-address", formData, {
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

// Fetching All Address
export const fetchAllAddresses = async (id) => {
  try {
    const res = await axios.get(`/api/address/get-all-address?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Updating the Address
export const updateAddress = async (formData) => {
  try {
    const res = await axios.put("/api/address/update-address", formData, {
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

// Deleting the Address
export const deleteAddress = async (id) => {
  try {
    const res = await axios.delete(`/api/address/delete-address?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
