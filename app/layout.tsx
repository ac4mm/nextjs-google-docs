import type { Metadata } from "next";
import localFont from "next/font/local";
import {GlobalContextProvider} from "@gds/app/context/store";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Google Docs",
  description: "Sync docs Colab with team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
      </body>
    </html>
  );
}
