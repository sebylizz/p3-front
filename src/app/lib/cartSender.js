"use server"
export default async function cartSender(cart) {
    console.log("cartsender called with id's " + cart);
    try {
        const response = await fetch('http://localhost:8080/productpayment/carttest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart)
        });
        if (!response.ok) {
            return { success: false };
        } 
        const paymentLink = response.text();
        return paymentLink;

    } catch (error) {
        console.error('Error login:', error);
        return { success: false };
    }
}
