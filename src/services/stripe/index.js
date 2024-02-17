import axios from "axios";
import Cookies from "js-cookie";

// Next auth url updated
export const callStripeSession = async (formData) => {
  try {
    const res = await axios.post("/api/stripe", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    console.log(res);

    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
