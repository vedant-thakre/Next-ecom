export const registerNewUser = async (formdata) => {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
