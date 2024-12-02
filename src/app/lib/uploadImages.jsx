async function uploadImages (images, id, colorId) {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });
    formData.append("folderName", `${id}/${colorId}`);

    const response = await fetch("/lib/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed with status ${response.status}`);
    }

    const { files } = await response.json();
    return files;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;  // Re-throw the error so it can be handled by the caller
  }
};

export default uploadImages;