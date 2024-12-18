import getJWT from "./getJWT";
async function updateProduct(productData, updatedProduct) {
  console.log("Payload for PUT request:", updatedProduct);

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
      console.log("Product updated successfully with new color mapping:", newColorMapping);
      return newColorMapping; 
    } else {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorDetails = await response.json(); 
        console.error("Backend returned an error:", errorDetails);
      } else {
        const errorDetails = await response.text(); 
        console.error("Error details:", errorDetails);
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
