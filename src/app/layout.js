import './globals.css';

import NavBar from './components/NavBar'
import FooterBasic from './components/FooterBasic';
import { ProductProvider } from './context/productContext';
import { CartProvider } from './context/cartContext';

export const metadata = {
    title: 'Leghetto',
    description: 'Leghetto',
};

export default function RootLayout({ children }) {
    return (
        <ProductProvider>
            <CartProvider>
                <html lang="en">
                    <body>
                        <NavBar />
                        <main>{children}</main>
                        <FooterBasic />
                    </body>
                </html>
            </CartProvider>
        </ProductProvider>
    );
}
