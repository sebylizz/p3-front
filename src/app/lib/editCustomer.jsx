'use server';

export default async function editCustomer(customerData) {
    try {

        const response = await fetch("http://localhost:8080/customers/updateCustomer", {
            method: "POST", 
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(customerData), 
        });


        if (response.ok) {
            const updatedCustomer = await response.json(); 
            console.log('Customer updated successfully:', updatedCustomer);
            return updatedCustomer;
        } else {

            const errorMessage = await response.text();
            console.error('Failed to update customer:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error in editCustomer:', error);
        throw error; 
    }
}
