import "./globals.css";
import Navbar from '../components/layout/Navbar';
import ReactQueryProvider from "@/components/ReactQueryProvider";
import RecoilRootProvider from "@/components/RecoilRootProvider";


export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="layout">
        <RecoilRootProvider>
          <ReactQueryProvider>
            <Navbar/>
            {children}
          </ReactQueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}

