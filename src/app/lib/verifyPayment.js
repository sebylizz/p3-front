export default async function verifyPayment(sessionId) {
    try {
        const response = await fetch("http://localhost:8080/payment/confirmorder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            body: sessionId
        });

        if (response.status === 409) {
            return { error: "Order already handled" };
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
    }

}
