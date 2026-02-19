import "./globals.css";
import Navbar from '../components/layout/Navbar';
import ReactQueryProvider from "@/components/ReactQueryProvider";

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="layout">
        <ReactQueryProvider>
          <Navbar/>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}

