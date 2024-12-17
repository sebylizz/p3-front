import getJWT from "./getJWT";

async function updateProduct(productData, updatedProduct) {
  if (!productData?.id) {
    throw new Error("Invalid product data: 'id' is required.");
  }

  console.log("Payload for PUT request:", updatedProduct);

  const token = await getJWT();
  if (!token?.value) {
    throw new Error("Authorization token is missing.");
  }

  console.log("JWT Token:", token.value);

  const endpoint = `http://localhost:8080/products/updateProduct/${productData.id}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      const newColorMapping = await response.json();
      console.log("Product updated successfully with new color mapping:", newColorMapping);

      if (!Array.isArray(newColorMapping)) {
        console.warn("Unexpected format for newColorMapping:", newColorMapping);
      }

      return newColorMapping;
    } else {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorDetails = await response.json();
        console.error(
          `Backend returned an error (status: ${response.status}):`,
          errorDetails
        );
      } else {
        const errorDetails = await response.text();
        console.error(
          `Error details (status: ${response.status}):`,
          errorDetails
        );
      }
      return false;
    }
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error or server is unreachable:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

export default updateProduct;
