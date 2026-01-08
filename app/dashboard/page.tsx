"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Coins, Droplets, TrendingUp, Activity, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import AnimatedButton from "@/components/AnimatedButton";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalTokens: 3,
    totalPools: 2,
    totalLiquidity: "$45,230",
    totalVolume: "$123,456",
  };

  const createdTokens = [
    {
      name: "My Awesome Token",
      symbol: "MAT",
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      supply: "1,000,000",
      created: "2024-01-15",
    },
    {
      name: "DeFi Protocol",
      symbol: "DFP",
      address: "So11111111111111111111111111111111111111112",
      supply: "10,000,000",
      created: "2024-01-10",
    },
    {
      name: "Game Token",
      symbol: "GTK",
      address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfWBzmL",
      supply: "500,000",
      created: "2024-01-05",
    },
  ];

  const createdPools = [
    {
      pair: "MAT/SOL",
      address: "pool_address_1",
      tvl: "$12,450",
      volume24h: "$2,340",
      fees24h: "$23.40",
      apr: "45.2%",
      created: "2024-01-16",
    },
    {
      pair: "DFP/USDC",
      address: "pool_address_2",
      tvl: "$32,780",
      volume24h: "$8,560",
      fees24h: "$85.60",
      apr: "67.8%",
      created: "2024-01-12",
    },
  ];

  const lpPositions = [
    {
      pool: "MAT/SOL",
      liquidity: "$5,230",
      share: "12.5%",
      unclaimedFees: "$45.67",
      tokens: ["MAT: 2,340", "SOL: 45.6"],
    },
    {
      pool: "DFP/USDC",
      liquidity: "$8,950",
      share: "8.2%",
      unclaimedFees: "$123.45",
      tokens: ["DFP: 1,890", "USDC: 3,456"],
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "tokens", label: "My Tokens", icon: Coins },
    { id: "pools", label: "My Pools", icon: Droplets },
    { id: "positions", label: "LP Positions", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-black">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Dashboard</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Monitor your tokens, pools, and liquidity positions all in one place.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Link href="/create-token">
              <AnimatedButton variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                <Plus className="w-4 h-4 mr-2" />
                Create Token
              </AnimatedButton>
            </Link>
            <Link href="/create-pool">
              <AnimatedButton variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                <Plus className="w-4 h-4 mr-2" />
                Create Pool
              </AnimatedButton>
            </Link>
            <Link href="/add-liquidity">
              <AnimatedButton variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                <Plus className="w-4 h-4 mr-2" />
                Add Liquidity
              </AnimatedButton>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Tokens</p>
                    <p className="text-2xl font-bold text-white">{stats.totalTokens}</p>
                  </div>
                  <Coins className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Pools</p>
                    <p className="text-2xl font-bold text-white">{stats.totalPools}</p>
                  </div>
                  <Droplets className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Liquidity</p>
                    <p className="text-2xl font-bold text-white">{stats.totalLiquidity}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">24h Volume</p>
                    <p className="text-2xl font-bold text-white">{stats.totalVolume}</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex space-x-1 bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "tokens" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Your Created Tokens</h2>
                {createdTokens.map((token, index) => (
                  <Card key={index} className="bg-black/40 backdrop-blur-xl border-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Coins className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{token.name}</h3>
                            <p className="text-gray-400">{token.symbol} • {token.supply} supply</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-1">Created {token.created}</p>
                          <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                            View on Explorer
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "pools" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Your Created Pools</h2>
                {createdPools.map((pool, index) => (
                  <Card key={index} className="bg-black/40 backdrop-blur-xl border-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Droplets className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{pool.pair}</h3>
                            <p className="text-gray-400">TVL: {pool.tvl} • APR: {pool.apr}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400 mb-1">Created {pool.created}</p>
                          <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                            View Pool
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "positions" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Your LP Positions</h2>
                {lpPositions.map((position, index) => (
                  <Card key={index} className="bg-black/40 backdrop-blur-xl border-blue-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{position.pool}</h3>
                            <p className="text-gray-400">{position.liquidity} • {position.share} share</p>
                            <p className="text-sm text-gray-500">{position.tokens.join(" • ")}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-400 mb-1">Unclaimed: {position.unclaimedFees}</p>
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            Claim Fees
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-blue-400" />
                      Recent Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {createdTokens.slice(0, 3).map((token, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{token.name}</p>
                            <p className="text-gray-400 text-sm">{token.symbol}</p>
                          </div>
                          <p className="text-gray-400 text-sm">{token.created}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-400" />
                      Recent Pools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {createdPools.map((pool, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{pool.pair}</p>
                            <p className="text-gray-400 text-sm">TVL: {pool.tvl}</p>
                          </div>
                          <p className="text-green-400 text-sm">{pool.apr} APR</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
