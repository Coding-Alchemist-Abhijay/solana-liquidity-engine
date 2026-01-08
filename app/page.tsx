"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Coins, TrendingUp, Star, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedButton from "@/components/AnimatedButton";

export default function Home() {
  const features = [
    {
      icon: Coins,
      title: "Token Creation",
      description: "Create and deploy your own tokens on Solana with customizable parameters and instant deployment.",
    },
    {
      icon: Zap,
      title: "Liquidity Pools",
      description: "Set up automated market maker pools with flexible fee tiers and optimal liquidity provision.",
    },
    {
      icon: TrendingUp,
      title: "Add Liquidity",
      description: "Provide liquidity to earn trading fees and participate in the DeFi ecosystem rewards.",
    },
    {
      icon: Shield,
      title: "DEX Trading",
      description: "Trade tokens seamlessly with low fees and high-speed transactions on Solana's network.",
    },
  ];

  return (
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Create Your Token &
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Liquidity Pool
              </span>
              <br />
              on Solana
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The premier platform for creating tokens and liquidity pools on Solana.
              Build, trade, and grow your DeFi projects with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/create-token">
                <AnimatedButton size="lg" className="text-lg px-8 py-6">
                  <Coins className="w-5 h-5 mr-2" />
                  Create Token
                  <ArrowRight className="w-5 h-5 ml-2" />
                </AnimatedButton>
              </Link>

              <Link href="/create-pool">
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Create Liquidity Pool
                  <ArrowRight className="w-5 h-5 ml-2" />
                </AnimatedButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need for DeFi
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From token creation to liquidity management, we provide all the tools you need to succeed in DeFi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 h-full hover:border-blue-500/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  $2.4M+
                </div>
                <div className="text-gray-400">Total Value Locked</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  1,234
                </div>
                <div className="text-gray-400">Active Pools</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  5,678
                </div>
                <div className="text-gray-400">Tokens Created</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to launch your DeFi project?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of developers building the future of decentralized finance on Solana.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/dashboard">
                <AnimatedButton size="lg" className="text-lg px-8 py-6">
                  <Star className="w-5 h-5 mr-2" />
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
