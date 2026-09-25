import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { FitLogProvider } from "@/context/FitLogContext"; 
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitLog — Train With Intent",
  description: "A dark, no-nonsense gym companion",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} dark`}>
      <body className="bg-[#0c0d10] text-zinc-100 font-sans antialiased min-h-screen flex flex-col">
        {/* অ্যাপের সবকিছু FitLogProvider দিয়ে র‍্যাপ করতে হবে */}
        <FitLogProvider>
          <Navbar />
        
          <main className="flex-1">{children}</main>
          {/* Toaster for notifications */}
          <Toaster position="bottom-right" />
        </FitLogProvider>
      </body>
    </html>
  );
}
