import './globals.css';

import FooterBasic from './components/FooterBasic';

export const metadata = {
    title: 'Leghetto',
    description: 'Leghetto',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <FooterBasic />
            </body>
        </html>
    );
}
