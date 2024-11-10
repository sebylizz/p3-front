import { cookies } from 'next/headers';
import AccountLayout from '../components/AccountLayout';
import { deleteToken } from '../lib/logOut'; // Ensure deleteToken is correctly imported

export default async function Account() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        // Fetch user information
        const response = await fetch('http://localhost:8080/login/users-allowed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token?.value}`
            }
        });

        if (!response.ok) {
            return <h1>Not logged in</h1>;
        }

        const userName = await response.text();

        // Render AccountLayout component with user data
        return <AccountLayout userName={userName} onLogout={deleteToken} />;
    } catch (error) {
        console.log('Error:', error);
        return <p>Error occurred: {error.message}</p>;
    }
}