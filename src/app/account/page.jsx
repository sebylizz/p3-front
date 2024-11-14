import AccountLayout from '../components/AccountLayout';
import { deleteToken } from '../lib/logOut';
import getJWT from '../lib/getJWT';

export default async function Account() {
    try {
        const token = await getJWT();

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

        return <AccountLayout userName={userName} onLogout={deleteToken} />;
    } catch (error) {
        console.log('Error:', error);
        return <p>Error occurred: {error.message}</p>;
    }
}
