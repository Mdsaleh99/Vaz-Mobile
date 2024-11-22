import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "../../actions/getCurrentUser";

const poppins = Poppins({
  subsets: ["latin"], 
  weight: ['400', '700']
});


export const metadata: Metadata = {
  title: "Vaz Mobile Gallery",
  description: "Mobile Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={` ${poppins.className} text-slate-800 `}>
        <Toaster toastOptions={{style:{backgroundColor: 'rgb(51 65 85)', color: '#fff'}}} />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
            {/* if auto importing not comming use ctrl + space */}
          </div>
        </CartProvider>
        

      </body>
    </html>
  );
}


/*

Usage of CartProvider
The CartProvider is used to wrap components in the app where the cart state needs to be available.

In this example:
The CartProvider wraps the app layout.
All child components (like NavBar, main, and Footer) can access the cartTotalQty state via the context.

*/