export default async function loginFunction(email, password) {
    try {
        const response = await fetch('http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Use parameters in the request body
        });

        if (!response.ok) {
            // If response is not ok, return an error indicator
            return { success: false };
        }

        // Return success if the login succeeded
        return { success: true };
    } catch (error) {
        console.error('Error login:', error);
        return { success: false };
    }
}
