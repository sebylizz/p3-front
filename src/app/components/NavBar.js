'use client';

import RightNav from './RightNav';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();

    return (
        <header className="flex justify-between items-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
            {/* Logo and Browse Products on the Left */}
            <div className="flex items-center space-x-4">
                <a href="/" aria-label="Leghetto logo" className="flex items-center">
                    <picture>
                        <img
                            src="/logo.png"
                            alt="Sf Logo"
                            className="h-8 md:h-10 lg:h-16 w-auto object-contain"
                            onClick={() => router.push("/")}
                        />
                    </picture>
                </a>
                <a
                    href="/browseProducts"
                    aria-label="Browse Products"
                    className="text-neutral-700 hover:text-black font-medium px-6 py-2 border border-transparent hover:border-neutral-300"
                >
                    Products
                </a>
                <a
                    href="/aboutUs"
                    aria-label="About Us"
                    className="text-neutral-700 hover:text-black font-medium px-6 py-2 border border-transparent hover:border-neutral-300"
                >
                    About Us
                </a>
                <a
                    href="/FAQ"
                    aria-label="FAQ"
                    className="text-neutral-700 hover:text-black font-medium px-6 py-2 border border-transparent hover:border-neutral-300"
                >
                    FAQ
                </a>
            </div>

            {/* Right-aligned Cart and Login */}
            <div className="flex items-center space-x-2">
                <RightNav />
            </div>
        </header>
    );
}
