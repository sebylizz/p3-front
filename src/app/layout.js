export const metadata = {
  title: "My Next.js App",
  description: "A fresh start with Next.js 13+",
}

export default function RootLayout({ children }) {
  return (
     <html lang="en">
        <body>{children}</body>
     </html>
  );
}
