'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  SfButton,
  SfIconShoppingCart,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconMenu,
} from '@storefront-ui/react';

export default function TopNav() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const actionItems = [
    {
        icon: <SfIconShoppingCart />,
        label: 'Cart',
        ariaLabel: 'Cart',
        role: 'cart',
      },      
    {
      label: 'Log in',
      icon: <SfIconPerson />,
      ariaLabel: 'Log in',
      role: 'login',
    },
  ];

  const handleButtonClick = (role) => {
    if (role === 'login') {
        console.log('Login clicked'); //go to login page
        router.push('/login');
    } else if( role === 'cart') {
        console.log('cart clicked'); // go to checkout page
        router.push('/checkout'); 
    } else {
        console.log('logo clicked'); // Return to homepage
        window.location.href = '/'; 
    }
   };

  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
        <a
          href="#"
          aria-label="SF Homepage"
          className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <picture>
            <source srcSet="/logo.png" media="(min-width: 768px)" />
            <img
              src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
              alt="Sf Logo"
              className="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
              onClick={() => handleButtonClick()}
            />
          </picture>
        </a>
        <SfButton
          aria-label="Open categories"
          className="lg:hidden order-first lg:order-1 mr-4"
          square
          variant="tertiary"
        >
          <SfIconMenu />
        </SfButton>
        
        
          
        <nav className="flex-1 flex justify-end lg:order-last lg:ml-4">
          <div className="flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
                aria-label={actionItem.ariaLabel}
                variant="tertiapri"
                square
                slotPrefix={actionItem.icon}
                // onClick for the three buttons: Logo = mainpage, Cart = checkout/see cart, Login = Loginpage (can also create new account)
                onClick={() => handleButtonClick(actionItem.role)}
              >
                {actionItem.role === 'login' && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">{actionItem.label}</p>
                )}
                {actionItem.role === 'cart' && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">{actionItem.label}</p>
                )}
                
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}