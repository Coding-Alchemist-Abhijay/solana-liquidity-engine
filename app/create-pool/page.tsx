"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreatePoolPage() {
  const [form, setForm] = useState({
    wallet: "",
    tokenAMint: "",
    tokenBMint: "",
    tokenADecimals: "",
    tokenBDecimals: "",
    initialPrice: "",
    tokenAAmount: "",
    tokenBAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ 
    transaction?: string; 
    poolId?: string; 
    poolAddress?: string;
    explorerUrl?: string;
    network?: string;
    error?: string 
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(form => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { wallet, tokenAMint, tokenBMint, tokenADecimals, tokenBDecimals, initialPrice, tokenAAmount, tokenBAmount } =
      form;
    if (
      !wallet ||
      !tokenAMint ||
      !tokenBMint ||
      tokenADecimals === "" ||
      tokenBDecimals === "" ||
      initialPrice === "" ||
      tokenAAmount === "" ||
      tokenBAmount === ""
    ) {
      setResult({ error: "Please complete all fields." });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/pool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet,
          tokenAMint,
          tokenBMint,
          tokenADecimals: Number(tokenADecimals),
          tokenBDecimals: Number(tokenBDecimals),
          initialPrice: Number(initialPrice),
          tokenAAmount: Number(tokenAAmount),
          tokenBAmount: Number(tokenBAmount),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult({ transaction: data.transaction , poolId : data.poolId, poolAddress: data.poolAddress, explorerUrl: data.explorerUrl, network: data.network  });
      } else {
        setResult({ error: data.error || "Unknown error" });
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to send request";
      setResult({ error: errorMsg });
    }
    setLoading(false);
  };

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

          <form
            className="space-y-8 bg-gray-900/70 p-10 rounded-2xl shadow-lg backdrop-blur-sm transition-shadow"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Wallet Public Key</label>
                <input
                  type="text"
                  name="wallet"
                  value={form.wallet}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="Your wallet public key"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Token A Mint</label>
                <input
                  type="text"
                  name="tokenAMint"
                  value={form.tokenAMint}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="Mint address of Token A"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Token B Mint</label>
                <input
                  type="text"
                  name="tokenBMint"
                  value={form.tokenBMint}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="Mint address of Token B"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Token A Decimals</label>
                <input
                  type="number"
                  name="tokenADecimals"
                  value={form.tokenADecimals}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="Decimals for Token A (e.g. 6)"
                  required
                  min={0}
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Token B Decimals</label>
                <input
                  type="number"
                  name="tokenBDecimals"
                  value={form.tokenBDecimals}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="Decimals for Token B (e.g. 9)"
                  required
                  min={0}
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Initial Price</label>
                <input
                  type="number"
                  name="initialPrice"
                  value={form.initialPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="Initial price (e.g. 0.01)"
                  step="0.00000001"
                  required
                  min={0}
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Initial Token A Deposit</label>
                <input
                  type="number"
                  name="tokenAAmount"
                  value={form.tokenAAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="e.g. 10"
                  step="0.00000001"
                  required
                  min={0}
                />
              </div>
              <div className="rounded-lg bg-gray-800/80 p-4 shadow border border-gray-700 transition-all">
                <label className="block text-gray-200 mb-2 font-semibold">Initial Token B Deposit</label>
                <input
                  type="number"
                  name="tokenBAmount"
                  value={form.tokenBAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900/90 text-white border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all placeholder-gray-400"
                  placeholder="e.g. 100"
                  step="0.00000001"
                  required
                  min={0}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg shadow-md transition-all duration-300 ease-in-out hover:from-blue-700 hover:to-cyan-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Submitting...</span>
              ) : (
                <span>Create Pool</span>
              )}
            </button>
          </form>

          {/* Result/Response Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 rounded-xl bg-gradient-to-r from-gray-900/90 to-gray-800/90 border border-cyan-700 shadow-lg p-6 text-white text-left"
            >
              {result.transaction ? (
                <>
                  <div className="mb-4">
                    <h3 className="font-semibold text-green-400 text-lg mb-2">✅ Pool Creation Transaction Ready!</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Your transaction has been generated successfully. Sign and submit it with your wallet to create the pool.
                    </p>
                  </div>
                  
                  {result.poolId && (
                    <div className="mb-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                      <span className="font-semibold text-blue-300 block mb-2">Pool Address:</span>
                      <div className="break-all bg-gray-900/70 p-2 rounded-md text-xs font-mono border border-gray-700 mb-2">
                        {result.poolId}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <a
                          href={result.explorerUrl || `https://solscan.io/account/${result.poolId}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors inline-block"
                        >
                          View on Solscan
                        </a>
                        <a
                          href={`https://explorer.solana.com/address/${result.poolId}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition-colors inline-block"
                        >
                          View on Solana Explorer
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(result.poolId || "");
                            alert("Pool address copied to clipboard!");
                          }}
                          className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
                        >
                          Copy Pool Address
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="font-semibold text-cyan-300 block mb-2">Transaction (base64):</span>
                    <div className="break-all bg-gray-900/70 p-3 rounded-md text-xs font-mono border border-gray-700 max-h-40 overflow-y-auto mb-2">
                      {result.transaction}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result.transaction || "");
                          alert("Transaction copied to clipboard!");
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                      >
                        Copy Transaction
                      </button>
                      <a
                        href={`https://solana-labs.github.io/solana-web3.js/classes/Transaction.html#deserialize`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-colors inline-block"
                      >
                        How to Submit
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700">
                    <h4 className="font-semibold text-yellow-300 mb-2">📝 Next Steps:</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                      <li>Copy the transaction above</li>
                      <li>Use a Solana wallet (Phantom, Solflare) or CLI to deserialize and sign it</li>
                      <li>Submit the signed transaction to Solana devnet</li>
                      <li>Once confirmed, view your pool using the links above</li>
                    </ol>
                  </div>
                </>
              ) : result.error ? (
                <div className="text-red-400 font-semibold">
                  <h3 className="text-lg mb-2">❌ Error</h3>
                  <p>{result.error}</p>
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
