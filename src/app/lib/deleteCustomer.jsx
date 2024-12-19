import getJWT from "./getJWT";

async function deleteCustomerAdmin(id) {
    try {
        const token = await getJWT();
        const response = await fetch(`http://localhost:8080/customers/deleteCustomer/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token?.value}`
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(errorMessage || `Failed to delete customer with status ${response.status}`);
        }

        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : null;
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
}

export default deleteCustomerAdmin;

