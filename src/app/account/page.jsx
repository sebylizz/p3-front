import AccountLayout from '../components/AccountLayout';
import logOut from '../lib/logOut';
import getJWT from '../lib/getJWT';

export default async function Account() {
    try {
        const token = await getJWT();

        const response = await fetch('http://leghettoback.hzbnfzh4gkdzh6br.northeurope.azurecontainer.io:8080//customers/getsinglecustomer', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${token.value}`
            }
        });
        const data = await response.json();
        
        if (!response.ok) {
            return <h1>Not logged in</h1>;
        }
        return <AccountLayout userName={data.firstName} onLogout={logOut} />;
    } catch (error) {
        console.log('Error:', error);
        return <p>Error occurred: {error.message}</p>;
    }
}
