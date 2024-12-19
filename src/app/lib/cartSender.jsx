"use server"
export default async function cartSender(info, cart) {
    info.userId = "0";
    try {
        const response = await fetch('http://localhost:8080/payment/generatesessionid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ details: info, productIds: cart }),
        });
        const sessionId = await response.text();
        if (!response.ok) {
            return -1;
        }
        return sessionId;
    } catch (error) {
        console.error(error);
        return -1;
    }
}
