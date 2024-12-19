async function DeleteFolder(idsToDelete){
    try {
        const response = await fetch("/lib/deleteFolder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ folderNames: idsToDelete }), 
        });

        if (response.ok) {
            console.log('Folders deleted successfully.');
        } else {
            console.error('Failed to delete folders:', response.status);
        }
    } catch (error) {
        console.error('Error while deleting folders:', error);
    }
}

export default DeleteFolder;
