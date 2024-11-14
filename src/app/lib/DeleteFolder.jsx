import React from 'react';

async function DeleteFolder(idsToDelete){
    try {
        // Send an array of folder names as JSON
        const response = await fetch("/lib/deleteFolder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ folderNames: idsToDelete }),  // Use JSON.stringify to send the array directly
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
