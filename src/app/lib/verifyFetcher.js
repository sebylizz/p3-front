export default async function verifyAccount(token) {
    try {
        const response = await fetch(`http://localhost:8080/customers/verify?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            return {success: false};

        } else {
            return {success: true};

        }
    } catch (error) {
        return {success: false};

    }
}