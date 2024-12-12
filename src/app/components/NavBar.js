import Link from 'next/link';

export default function NavBar() {
    return (
        <header className="flex justify-between items-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
            <div className="flex items-center space-x-4">
                <Link href="/" aria-label="Leghetto logo" className="flex items-center">
                    <picture>
                        <img
                            src="/logo.png"
                            alt="Sf Logo"
                            className="h-8 md:h-10 lg:h-16 w-auto object-contain"
                        />
                    </picture>
                </Link>
                <Link
                    href="/browseProducts"
                    aria-label="Browse Products"
                    className="text-neutral-700 hover:text-black font-medium px-6 py-2 border border-transparent hover:border-neutral-300"
                >
                    Products
                </Link>
                <Link
                    href="/aboutUs"
                    aria-label="About Us"
                    className="text-neutral-700 hover:text-black font-medium px-6 py-2 border border-transparent hover:border-neutral-300"
                >
                    About Us
                </Link>
                <Link
                    href="/FAQ"
                    aria-label="FAQ"
                    className="text-neutral-700 hover:text-black font-medium px-6 py-2 border border-transparent hover:border-neutral-300"
                >
                    FAQ
                </Link>
            </div>

            <div className="flex items-center space-x-2">
                <RightNav />
            </div>
        </header>
    );
}
