"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import AnimatedButton from "./AnimatedButton";
import { Plus, Coins, BarChart3, Zap } from "lucide-react";

export default function LiquidityForm() {
  const [formData, setFormData] = useState({
    tokenA: "",
    tokenB: "",
    amountA: "",
    amountB: "",
    slippage: 0.5,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Liquidity addition data:", formData);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock pool data
  const selectedPool = {
    tokenA: "SOL",
    tokenB: "USDC",
    ratio: "1 SOL = 123.45 USDC",
    tvl: "$2.4M",
    volume24h: "$456K",
  };

  const estimatedLP = parseFloat(formData.amountA) * 2 || 0;

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
              <Plus className="w-6 h-6 text-blue-400" />
            </div>
            Add Liquidity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pool Selection Info */}
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Selected Pool</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Pair</p>
                  <p className="text-white font-mono">{selectedPool.tokenA}/{selectedPool.tokenB}</p>
                </div>
                <div>
                  <p className="text-gray-400">Ratio</p>
                  <p className="text-white font-mono">{selectedPool.ratio}</p>
                </div>
                <div>
                  <p className="text-gray-400">TVL</p>
                  <p className="text-white font-mono">{selectedPool.tvl}</p>
                </div>
                <div>
                  <p className="text-gray-400">24h Volume</p>
                  <p className="text-white font-mono">{selectedPool.volume24h}</p>
                </div>
              </div>
            </div>

            {/* Token A Amount */}
            <div className="space-y-2">
              <Label htmlFor="amountA" className="flex items-center gap-2 text-gray-300">
                <Coins className="w-4 h-4" />
                {selectedPool.tokenA} Amount
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="amountA"
                  type="number"
                  step="0.000001"
                  placeholder="0.0"
                  value={formData.amountA}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange("amountA", value);
                    // Auto-calculate token B amount based on ratio
                    const amountA = parseFloat(value);
                    if (!isNaN(amountA)) {
                      handleInputChange("amountB", (amountA * 123.45).toFixed(6));
                    } else {
                      handleInputChange("amountB", "");
                    }
                  }}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors text-lg py-6"
                />
              </motion.div>
            </div>

            {/* Token B Amount */}
            <div className="space-y-2">
              <Label htmlFor="amountB" className="flex items-center gap-2 text-gray-300">
                <Coins className="w-4 h-4" />
                {selectedPool.tokenB} Amount
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="amountB"
                  type="number"
                  step="0.000001"
                  placeholder="0.0"
                  value={formData.amountB}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange("amountB", value);
                    // Auto-calculate token A amount based on ratio
                    const amountB = parseFloat(value);
                    if (!isNaN(amountB)) {
                      handleInputChange("amountA", (amountB / 123.45).toFixed(6));
                    } else {
                      handleInputChange("amountA", "");
                    }
                  }}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors text-lg py-6"
                />
              </motion.div>
            </div>

            {/* Slippage Tolerance */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-gray-300">
                <BarChart3 className="w-4 h-4" />
                Slippage Tolerance: {formData.slippage}%
              </Label>
              <Slider
                value={[formData.slippage]}
                onValueChange={(value) => handleInputChange("slippage", value[0])}
                max={5}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0.1%</span>
                <span>5%</span>
              </div>
            </div>

            {/* LP Token Preview */}
            {formData.amountA && formData.amountB && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg"
              >
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Position Preview
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">LP Tokens to Receive:</span>
                    <span className="text-white font-mono">{estimatedLP.toFixed(2)} LP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pool Share:</span>
                    <span className="text-white font-mono">{((estimatedLP / 100000) * 100).toFixed(4)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expected Fees (24h):</span>
                    <span className="text-white font-mono">$12.34</span>
                  </div>
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
                disabled={!formData.amountA || !formData.amountB}
              >
                {isLoading ? "Adding Liquidity..." : "Add Liquidity"}
              </AnimatedButton>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
