"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PoolForm from "@/components/PoolForm";

export default function CreatePoolPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-black">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Create
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Liquidity Pool</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Set up an automated market maker pool on Solana.
              Choose your tokens, set the initial price, and select fee tiers.
            </p>
          </motion.div>

          <PoolForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
