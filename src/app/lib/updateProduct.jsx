import getJWT from "./getJWT";

async function updateProduct(productData, updatedProduct) {
  if (!productData?.id) {
    throw new Error("Invalid product data: 'id' is required.");
  }



  const token = await getJWT();
  try {
    const response = await fetch(`http://localhost:8080/products/updateProduct/${productData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.value}`
       },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      const newColorMapping = await response.json();

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
