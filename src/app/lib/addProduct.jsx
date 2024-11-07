async function addProduct(productData) {
    try {
      const response = await fetch("http://localhost:8080/products/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add product with status ${response.status}`);
      }
  
      const responseText = await response.text();
      return responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  export default addProduct;