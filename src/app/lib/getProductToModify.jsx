import getJWT from "./getJWT";
async function getProductToModify(id) {
  try {
    const token = await getJWT();
    console.log(token);
    const response = await fetch(
      `http://localhost:8080/products/modifyProduct/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token?.value}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default getProductToModify;
