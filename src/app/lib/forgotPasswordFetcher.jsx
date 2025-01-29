export default async function loginFunction(email) {
    try {
        const response = await fetch('http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//login/forgot', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        });

        if (!response.ok) {
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Error login:', error);
        return { success: false };
    }
}
