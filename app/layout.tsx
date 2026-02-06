import "./globals.css";
import Navbar from './components/layout/Navbar';

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="layout">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
