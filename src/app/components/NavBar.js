'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  SfButton,
  SfIconShoppingCart,
  SfIconPerson,
  SfIconMenu,
} from '@storefront-ui/react';

export default function TopNav() {
  const router = useRouter();

  const mainNavItems = [
    { label: 'FAQ', ariaLabel: 'FAQ', role: 'FAQ' },
    { label: 'About Us', ariaLabel: 'About Us', role: 'AboutUs' },
  ];

  const rightNavItems = [
    { icon: <SfIconShoppingCart />, label: 'Cart', ariaLabel: 'Cart', role: 'cart' },
    { icon: <SfIconPerson />, label: 'Log in', ariaLabel: 'Log in', role: 'login' },
  ];

  const handleButtonClick = (role) => {
    if (role === 'login') {
      router.push('/login');
    } else if (role === 'cart') {
      router.push('/checkout');
    } else if (role === 'FAQ') {
      router.push('/FAQ');
    } else if (role === 'About Us') {
      router.push('/About_us');
    }
    else {
      window.location.href = '/';
    }
  };

  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
      <div className="flex items-center h-full max-w-[1536px] w-full">
      <a href="#" aria-label="SF Homepage" className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0">
  <picture>
    <source srcSet="/logo.png" />
    <img
      src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
      alt="Sf Logo"
      className="h-8 md:h-10 lg:h-12 w-auto object-contain"
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

        {/* Centered and Spaced-Out Navigation */}
        <nav className="flex-1 flex justify-center lg:ml-4">
          <div className="flex justify-between w-full max-w-xs lg:max-w-md">
            {mainNavItems.map((item) => (
              <SfButton
                key={item.ariaLabel}
                className="rounded-md text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
                aria-label={item.ariaLabel}
                variant="tertiary"
                onClick={() => handleButtonClick(item.role)}
              >
                {item.label}
              </SfButton>
            ))}
          </div>
        </nav>

        {/* Right-aligned Cart and Login */}
        <div className="flex items-center space-x-2">
          {rightNavItems.map((item) => (
            <SfButton
              key={item.ariaLabel}
              className="rounded-md text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
              aria-label={item.ariaLabel}
              variant="tertiary"
              slotPrefix={item.icon}
              onClick={() => handleButtonClick(item.role)}
            >
              <span className="hidden xl:inline-flex whitespace-nowrap">{item.label}</span>
            </SfButton>
          ))}
        </div>
      </div>
    </header>
  );
}
