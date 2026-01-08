"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import {WalletMultiButton,WalletDisconnectButton} from "@solana/wallet-adapter-react-ui"
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Create Token", href: "/create-token" },
    { name: "Create Pool", href: "/create-pool" },
    { name: "Add Liquidity", href: "/add-liquidity" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-blue-500/20 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              AquaDEX
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Wallet Connect Button */}
          <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <WalletMultiButton
              className="!bg-gradient-to-r !from-blue-400 !to-cyan-400 
                        hover:scale-105 transition-transform"
            />
            <WalletDisconnectButton
              className="!border !border-cyan-400 !text-cyan-400"
            />
          </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-blue-500/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex space-x-2">
                <WalletMultiButton
                  className="!bg-gradient-to-r !from-blue-400 !to-cyan-400 
                            hover:scale-105 transition-transform"
                />
                <WalletDisconnectButton
                  className="!border !border-cyan-400 !text-cyan-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
