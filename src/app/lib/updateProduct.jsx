async function updateProduct(productData, updatedProduct) {
    try {
      const response = await fetch(`http://localhost:8080/products/updateproduct/${productData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
  
      if (response.ok) {
        console.log("Product updated successfully!");
        return true; 
      } else {
        console.error("Failed to update product:", response.status);
        return false;  
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
  
  export default updateProduct;
  