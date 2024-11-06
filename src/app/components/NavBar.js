'use client';
import { useRouter } from 'next/navigation';
import { SfButton, SfIconShoppingCart, SfIconPerson, SfIconMenu } from '@storefront-ui/react';

export default function TopNav() {
    const router = useRouter();

    const rightNavItems = [
        { icon: <SfIconShoppingCart />, label: 'Cart', ariaLabel: 'Cart', role: 'cart' },
        { icon: <SfIconPerson />, label: 'Log in', ariaLabel: 'Log in', role: 'login' },
        { icon: <SfIconPerson />, label: 'Account', ariaLabel: 'Account', role: 'account' },
    ];

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

    return (
        <header className="flex justify-between items-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
            {/* Logo on the Left */}
            <a href="#" aria-label="SF Homepage" className="flex items-center">
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
        </header>
    );
}
