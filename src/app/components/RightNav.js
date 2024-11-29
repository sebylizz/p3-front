'use client'

import { SfIconShoppingCart, SfIconPerson } from '@storefront-ui/react';
import isLoggedIn from '../lib/isTokenValid.js';  // Server-side login check
import { useEffect, useState } from 'react';
import RightNavButton from '../components/RightNavButton';
import { useCart } from '../context/cartContext.js';

export default function RightNav() {
    const [loggedIn, setLoggedIn] = useState(null);
    useEffect(() => {
        const fetchLoginStatus = async () => {
            const loginStatus = await isLoggedIn();
            setLoggedIn(loginStatus);
        };

        fetchLoginStatus();
    }, []);

    const { cart } = useCart();
    const nrItems = cart.length;
    console.log(cart)

    if (loggedIn === null) {
        return; 
    }

    const rightNavItems = [
        { icon: <SfIconShoppingCart />, label: <>Cart (<span style={{color: "orange"}}>{nrItems}</span>)</>, ariaLabel: 'Cart', role: 'cart' },
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
