'use server';

export default async function editCustomer(customerData) {
    try {
        // Send customer data to the backend using the POST method
        const response = await fetch("http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//customers/updateCustomer", {
            method: "POST", // Specify POST request
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json', // Send data as JSON
            },
            body: JSON.stringify(customerData), // Convert customerData to JSON string
        });

        // Check if the response is successful (status code 200)
        if (response.ok) {
            const updatedCustomer = await response.json(); // Parse the JSON response
            console.log('Customer updated successfully:', updatedCustomer);
            return updatedCustomer;
        } else {
            // If there was an error, log it and throw an exception
            const errorMessage = await response.text();
            console.error('Failed to update customer:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error in editCustomer:', error);
        throw error; // Rethrow the error if needed
    }
}
