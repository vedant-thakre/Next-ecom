// Add product to the cart
export const addToCart = async (formData) => {
  try {
    const res = await fetch("/api/cart/add-to-cart", {
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

// Increment the product quantity
export const IncrementItemQuantity = async (formData) => {
  try {
    const res = await fetch("/api/cart/increment-quantity", {
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

// Decrement the product quantity
export const DecrementItemQuantity = async (formData) => {
  try {
    const res = await fetch("/api/cart/decrement-quantity", {
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

// Get all products from the cart
export const getAllCartItems = async (id) => {
  try {
    const res = await fetch(`/api/cart/all-cart-items?id=${id}`, {
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

// Delete product from the cart
export const deleteFromCart = async (id) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
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
