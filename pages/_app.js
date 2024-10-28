import React from "react";
import Navbar from "@/components/Navbar";
import { Poppins } from 'next/font/google'
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap', // This ensures the font is swapped when available.
});

export default function App({ Component, pageProps }) {

  // React.useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault(); // Prevent the default context menu
  //   };

  //   // Add the event listener for right-click
  //   window.addEventListener('contextmenu', handleContextMenu);

  //   return () => {
  //     // Clean up the event listener when the component is unmounted
  //     window.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  return (
    <main className={`${poppins.className} relative font-sans`}>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div> */}
      <Component {...pageProps} />
    </main>
  )
}
