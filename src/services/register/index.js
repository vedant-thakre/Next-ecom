import axios from "axios";

export const registerNewUser = async (formdata) => {
  try {
    const res = await axios.post("/api/register", formdata, {
      headers: {
        "content-type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
