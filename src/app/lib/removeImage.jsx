// removeImage.js

async function removeImage(imageName) {
    try {
      const response = await fetch("/lib/delete", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: imageName }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete image on server");
      }
  
      console.log("Image deleted from server:", imageName);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  
  export default removeImage;
  