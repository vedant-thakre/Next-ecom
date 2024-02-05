export const registerNewUser = async(formdata) => {
    try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formdata),
        });
        const finalData = await res.json();
        return finalData;
    } catch (error) {
        console.log("Error : ", error);
    }
}