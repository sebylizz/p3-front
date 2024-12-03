import getJWT from "./getJWT";
async function customerFetcherId(id) {
    try {
        const token = await getJWT();
        console.log(token)
        const response = await fetch(`http://localhost:8080/customers/getCustomerById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token?.value}`
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(errorMessage || `Failed to fetch customer with ID: ${id}`);
        }

        const customer = await response.json(); 
        return customer;
    } catch (error) {
        console.error("Error fetching customer by ID:", error);
        throw error; 
    }
}

export default customerFetcherId;

