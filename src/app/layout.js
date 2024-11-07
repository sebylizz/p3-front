import './globals.css';

import NavBar from './components/NavBar'
import FooterBasic from './components/FooterBasic';
import { ProductProvider } from './context/productContext';

export const metadata = {
    title: 'Leghetto',
    description: 'Leghetto',
};

export default function RootLayout({ children }) {
    return (
        <ProductProvider>
        <html lang="en">
            <body>
                <NavBar />
                {children}
                <FooterBasic />
            </body>
        </html>
        </ProductProvider>

    );
}
