'use client'

export default async function logOut() {
    try {
        const response = await fetch('http://localhost:8080/login/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            return { success: false };
        }
        return { success: true };
    } catch (error) {
        console.error('Error logout:', error);
        return { success: false };
    }
}
