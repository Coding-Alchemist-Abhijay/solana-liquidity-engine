"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AnimatedButton from "./AnimatedButton";
import { Droplets, Coins, TrendingUp, Settings } from "lucide-react";

export default function PoolForm() {
  const [formData, setFormData] = useState({
    baseToken: "",
    quoteToken: "",
    initialPrice: "",
    feeTier: "0.3",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Pool creation data:", formData);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock token options
  const tokenOptions = [
    { value: "SOL", label: "Solana (SOL)" },
    { value: "USDC", label: "USD Coin (USDC)" },
    { value: "RAY", label: "Raydium (RAY)" },
    { value: "BONK", label: "Bonk (BONK)" },
  ];

  const feeTiers = [
    { value: "0.01", label: "0.01%" },
    { value: "0.05", label: "0.05%" },
    { value: "0.3", label: "0.3%" },
    { value: "1", label: "1%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-400" />
            </div>
            Create Liquidity Pool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Base Token */}
            <div className="space-y-2">
              <Label htmlFor="baseToken" className="flex items-center gap-2 text-gray-300">
                <Coins className="w-4 h-4" />
                Base Token
              </Label>
              <Select onValueChange={(value) => handleInputChange("baseToken", value)}>
                <SelectTrigger className="bg-black/50 border-blue-500/30 text-white focus:border-blue-400">
                  <SelectValue placeholder="Select base token" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-blue-500/30">
                  {tokenOptions.map((token) => (
                    <SelectItem key={token.value} value={token.value} className="text-white hover:bg-blue-500/20">
                      {token.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quote Token */}
            <div className="space-y-2">
              <Label htmlFor="quoteToken" className="flex items-center gap-2 text-gray-300">
                <Coins className="w-4 h-4" />
                Quote Token
              </Label>
              <Select onValueChange={(value) => handleInputChange("quoteToken", value)}>
                <SelectTrigger className="bg-black/50 border-blue-500/30 text-white focus:border-blue-400">
                  <SelectValue placeholder="Select quote token" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-blue-500/30">
                  {tokenOptions.map((token) => (
                    <SelectItem key={token.value} value={token.value} className="text-white hover:bg-blue-500/20">
                      {token.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Initial Price */}
            <div className="space-y-2">
              <Label htmlFor="initialPrice" className="flex items-center gap-2 text-gray-300">
                <TrendingUp className="w-4 h-4" />
                Initial Price
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="initialPrice"
                  type="number"
                  step="0.000001"
                  placeholder="e.g. 0.000123"
                  value={formData.initialPrice}
                  onChange={(e) => handleInputChange("initialPrice", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
              <p className="text-sm text-gray-400">
                Price of 1 {formData.baseToken || "base token"} in {formData.quoteToken || "quote token"}
              </p>
            </div>

            {/* Fee Tier */}
            <div className="space-y-2">
              <Label htmlFor="feeTier" className="flex items-center gap-2 text-gray-300">
                <Settings className="w-4 h-4" />
                Fee Tier
              </Label>
              <Select value={formData.feeTier} onValueChange={(value) => handleInputChange("feeTier", value)}>
                <SelectTrigger className="bg-black/50 border-blue-500/30 text-white focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-blue-500/30">
                  {feeTiers.map((tier) => (
                    <SelectItem key={tier.value} value={tier.value} className="text-white hover:bg-blue-500/20">
                      {tier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                Trading fee charged on each swap
              </p>
            </div>

            {/* Pool Info Card */}
            {formData.baseToken && formData.quoteToken && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg"
              >
                <h4 className="font-semibold text-white mb-2">Pool Preview</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <p>Pool: {formData.baseToken}/{formData.quoteToken}</p>
                  <p>Fee Tier: {feeTiers.find(t => t.value === formData.feeTier)?.label}</p>
                  <p>Initial Price: {formData.initialPrice || "Not set"}</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedButton
                type="submit"
                loading={isLoading}
                className="w-full text-lg py-6"
                disabled={!formData.baseToken || !formData.quoteToken || !formData.initialPrice}
              >
                {isLoading ? "Creating Pool..." : "Create Pool"}
              </AnimatedButton>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
