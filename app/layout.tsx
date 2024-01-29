import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components";
import "./globals.css";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-red-600 flex flex-col min-h-screen ${inter.className}`}
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 2xl:px-0">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
