import AccountLayout from '../components/AccountLayout';
import logOut from '../lib/logOut';
import getCustomer from '../lib/fetchCustomer';

export default async function Account() {
        data = await getCustomer();
        if (!data.ok) {
            return <h1>Not logged in</h1>;
        }
        return <AccountLayout userName={data.firstName} onLogout={logOut} />;
     
}
