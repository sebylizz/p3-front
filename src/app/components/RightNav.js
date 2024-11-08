'use client'

import { SfIconShoppingCart, SfIconPerson } from '@storefront-ui/react';
import isLoggedIn from '../lib/isLoggedIn';  // Server-side login check
import { useEffect, useState } from 'react';
import RightNavButton from '../components/RightNavButton';

export default function RightNav() {
    const [loggedIn, setLoggedIn] = useState(null);
    useEffect(() => {
        const fetchLoginStatus = async () => {
            const loginStatus = await isLoggedIn();
            setLoggedIn(loginStatus);
        };

        fetchLoginStatus();
    }, []);

    if (loggedIn === null) {
        return;  // Optionally show a loading indicator
    }

    const rightNavItems = [
        { icon: <SfIconShoppingCart />, label: 'Cart', ariaLabel: 'Cart', role: 'cart' },
        loggedIn ? { icon: <SfIconPerson />, label: 'Account', ariaLabel: 'Account', role: 'account' } : { icon: <SfIconPerson />, label: 'Log in', ariaLabel: 'Log in', role: 'login' }
    ];

    return (
        <>
            {rightNavItems.map((item) => (
                <RightNavButton key={item.ariaLabel} item={item} />
            ))}
        </>
    );
}
