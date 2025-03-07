import DeleteFolder from "./DeleteFolder";

async function HandleDelete(idsToDelete){
  console.log("Deleting IDs:", idsToDelete);


  try {
    const response = await fetch('http://localhost:8080/products/deleteproducts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idsToDelete), // Send array of IDs as JSON
    });
      DeleteFolder(idsToDelete);
    if (response.ok) {
      console.log('Products deleted successfully.');
    } else {
      console.error('Failed to delete products:', response.status);
    }
  } catch (error) {
    console.error('Error while deleting products:', error);
  }
};
export default HandleDelete;
