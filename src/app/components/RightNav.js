'use client'

import { SfIconShoppingCart, SfIconPerson } from '@storefront-ui/react';
import isLoggedIn from '../lib/isTokenValid.js';  // Server-side login check
import { useEffect, useState } from 'react';
import RightNavButton from '../components/RightNavButton';
import { useCart } from '../context/cartContext.js';
import getJWT from '../lib/getJWT.js';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useRouter } from 'next/navigation'; 

export default function RightNav() {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const fetchLoginStatus = async () => {
            const loginStatus = await isLoggedIn();
            setLoggedIn(loginStatus);
            if (loginStatus) {
                const token = await getJWT(); 
                if (token) {
                    const payload = JSON.parse(
                        atob(token.value.split('.')[1])
                    );
                    setIsAdmin(payload.groups?.includes('admin')); 
                }
            }
        };


        fetchLoginStatus();
    }, []);

    const { cart } = useCart();
    const nrItems = cart.length;

    if (loggedIn === null) {
        return;  
    }
    const rightNavItems = [
        { icon: <SfIconShoppingCart />, label: <>Cart (<span style={{color: "orange"}}>{nrItems}</span>)</>, ariaLabel: 'Cart', role: 'cart' },
        loggedIn ? { icon: <SfIconPerson />, label: 'Account', ariaLabel: 'Account', role: 'account' } : { icon: <SfIconPerson />, label: 'Log in', ariaLabel: 'Log in', role: 'login' }
    ];

    if (isAdmin) {
        rightNavItems.push({
            icon: (
                <AdminPanelSettingsOutlinedIcon style={{ fontSize: '1.5rem', color: 'black' }} />
            ),
            label: 'Admin',
            ariaLabel: 'Admin Panel',
            role:"admin"
        });
    }



    return (
        <>
        {rightNavItems.map((item, index) => (
            <RightNavButton
                key={index}
                item={item}
                onClick={item.onClick || undefined} // Pass onClick if defined
            />
        ))}
    </>
    );
}
