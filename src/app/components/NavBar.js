'use client';

import RightNav from './RightNav';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();

    return (
        <header className="flex justify-between items-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
            {/* Logo on the Left */}
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

            {/* Right-aligned Cart and Login */}
            <div className="flex items-center space-x-2">
                <RightNav />
            </div>
        </header>
    );
}
