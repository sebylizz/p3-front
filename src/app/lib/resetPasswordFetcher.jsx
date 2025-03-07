export default async function resetPassword(data) {
    try {
        const response = await fetch('http://localhost:8080/login/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return { success: false };
        } else {
            return { success: true };
        }
    } catch (error) {
        return { success: false };
    }
}
