import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FitLogProvider } from "@/context/FitLogContext";
import { Toaster } from "react-hot-toast";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitLog — Train With Intent",
  description: "Track your workouts and daily routine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-[#0b0c0e] text-white font-sans min-h-screen antialiased selection:bg-[#ccff00] selection:text-black">
        <FitLogProvider>
          {/* Toast Container */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#ffffff",
                border: "1px solid #27272a",
                fontSize: "14px",
                fontWeight: "600",
              },
            }}
          />
          <Navbar />
          <main>{children}</main>
        </FitLogProvider>
      </body>
    </html>
  );
}