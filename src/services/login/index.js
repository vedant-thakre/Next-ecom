export const loginNewUser = async (formdata) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const finalData = res.json();
    return finalData;
  } catch (error) {
    console.log("Error : ", error);
  }
};
