'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
