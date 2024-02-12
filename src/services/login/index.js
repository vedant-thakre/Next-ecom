import axios from "axios";

export const loginNewUser = async (formData) => {
  try {
    const res = await axios.post("/api/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
