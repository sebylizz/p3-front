import './globals.css';

import NavBar from './components/NavBar'
import FooterBasic from './components/FooterBasic';

export const metadata = {
    title: 'Leghetto',
    description: 'Leghetto',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
                <FooterBasic />

            </body>
        </html>
    );
}
