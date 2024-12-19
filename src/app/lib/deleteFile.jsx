const deleteFiles = async (filesToDelete) => {
  try {
    const formData = new FormData();
    filesToDelete.forEach(({ productId, colorId, filename }) => {
      formData.append("file", filename);
      formData.append("folderName", `${productId}/${colorId}`);
    });

    const response = await fetch("/lib/delete", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Files deleted successfully:", result.message);
    } else {
      console.error("Error deleting files:", result.error);
    }
  } catch (error) {
    console.error("File deletion request failed:", error);
  }
};

export default deleteFiles;