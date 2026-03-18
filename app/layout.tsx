import "./globals.css";
import Navbar from '../components/layout/Navbar';
import ReactQueryProvider from "@/components/ReactQueryProvider";
import RecoilRootProvider from "@/components/RecoilRootProvider";
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer } from "react-toastify";

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="layout">
        <RecoilRootProvider>
          <ReactQueryProvider>
            <Navbar/>
            <ToastContainer autoClose={1000} pauseOnFocusLoss={false}/>
            {children}
          </ReactQueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}

