export default async function loginFunction(email, password) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Use parameters in the request body
        });

        if (!response.ok) {
            // If response is not ok, return an error indicator
            return { success: false };
        }

        const result = await response.json();

        // Return success if the login succeeded
        return { success: true, data: result };
    } catch (error) {
        console.error('Error login:', error);
        return { success: false };
    }
}
