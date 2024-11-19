export default async function cartSender(token, cart) {
    try {
        const response = await fetch('http://localhost:8080/productpayment/carttest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{token, cart}])
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
