export default async function addCustomer(data) {
    try {
        const response = await fetch('http://localhost:8080/customers/addcustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return { success: false };
        } else {
            return { success: true };
        }
    } catch (error) {
        console.error('Error login:', error);
        return { success: false };
    }
}
