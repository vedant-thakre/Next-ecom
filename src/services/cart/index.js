import axios from 'axios';
import Cookies from 'js-cookie';

// Add product to the cart
export const addToCart = async (formData) => {
  try {
    const res = await axios.post('/api/cart/add-to-cart', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Increment the product quantity
export const IncrementItemQuantity = async (formData) => {
  try {
    const res = await axios.post('/api/cart/increment-quantity', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Decrement the product quantity
export const DecrementItemQuantity = async (formData) => {
  try {
    const res = await axios.post('/api/cart/decrement-quantity', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Get all products from the cart
export const getAllCartItems = async (id) => {
  try {
    const res = await axios.get(`/api/cart/all-cart-items?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete product from the cart
export const deleteFromCart = async (id) => {
  try {
    const res = await axios.delete(`/api/cart/delete-from-cart?id=${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
