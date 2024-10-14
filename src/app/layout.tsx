import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";

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
      <body
        className={` ${poppins.className} text-slate-800 `}
      >

        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
          {/* if auto importing not comming use ctrl + space */}
        </div>

      </body>
    </html>
  );
}
