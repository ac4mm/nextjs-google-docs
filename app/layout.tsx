import type { Metadata } from "next";
import {GlobalContextProvider} from "@gds/app/context/store";
import {robotoMono} from "@gds/app/ui/fonts";
import "./globals.css";

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
        className={`${robotoMono.className} antialiased h-full`}
      >
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
      </body>
    </html>
  );
}
