// src/app/components/RightNav.js

import { useRouter } from 'next/navigation';
import { SfIconShoppingCart, SfIconPerson } from '@storefront-ui/react';

export default function RightNav({ isLoggedIn }) {
    const router = useRouter();

    const handleButtonClick = (role) => {
        if (role === 'login') {
          router.push('/login');
        } else if (role === 'cart') {
          router.push('/checkout');
        } else if (role === 'account') {
          router.push('/account');
        } else {
          window.location.href = '/';
        }
      };

  const rightNavItems = [
    { icon: <SfIconShoppingCart />, label: 'Cart', ariaLabel: 'Cart', role: 'cart' },
    isLoggedIn
      ? { icon: <SfIconPerson />, label: 'Account', ariaLabel: 'Account', role: 'account' }
      : { icon: <SfIconPerson />, label: 'Log in', ariaLabel: 'Log in', role: 'login' }
  ];

  return (
    <>
      {rightNavItems.map((item) => (
        <button
          key={item.ariaLabel}
          aria-label={item.ariaLabel}
          onClick={() => handleButtonClick(item.role)}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </>
  );
}
