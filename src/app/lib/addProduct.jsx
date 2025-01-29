import getJWT from "./getJWT";

async function addProduct(productData) {
  try {
    const token = await getJWT();

    const response = await fetch("http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to add product with status ${response.status}: ${errorText}`
      );
    }

    const responseData = await response.json();

    const { productId, colorIds } = responseData;

    if (!productId || !Array.isArray(colorIds)) {
      throw new Error(
        "Invalid response from server: Missing productId or colorIds"
      );
    }

    return { productId, colorIds };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export default addProduct;
