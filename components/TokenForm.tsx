"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AnimatedButton from "./AnimatedButton";
import { Coins, Hash, Calculator, Settings, Image as ImageIcon } from "lucide-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  getMintLen,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  LENGTH_SIZE,
  TYPE_SIZE,
  createInitializeMetadataPointerInstruction,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

type TokenFormData = {
  name: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  mintAuthority: boolean;
  description: string;
  imageUrl: string; // Now storing url, not File
};

export default function TokenForm() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    decimals: "9",
    totalSupply: "",
    mintAuthority: true,
    description: "",
    imageUrl: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  // Error/success state
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (key: keyof TokenFormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setSubmitError(null);
    setTxSignature(null);
    try {
      if (!wallet.publicKey) {
        alert("Please connect your wallet.");
        setIsLoading(false);
        return;
      }
      if (!formData.imageUrl) {
        alert("Please provide an image URL");
        setIsLoading(false);
        return;
      }

      // Use the provided image url for metadata
      const imageUrl = formData.imageUrl;
      // Upload metadata to IPFS (like uploadMetaData/route.ts)
      const metadataJson = {
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        image: imageUrl,
      };

      const metaRes = await fetch("/api/uploadMetaData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata: metadataJson }),
      });

      if (!metaRes.ok) {
        throw new Error("Failed to upload metadata.");
      }
      const metaResJson = await metaRes.json();
      const uri: string = metaResJson.uri;

      // Prepare mint
      const mintKeypair = Keypair.generate();
      const mintDecimals = Number(formData.decimals);

      const metadata = {
        mint: mintKeypair.publicKey,
        name: formData.name,
        symbol: formData.symbol,
        uri,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
      const totalSpace = mintLen + metadataLen;

      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

      const tx = new Transaction().add(
        // 1️⃣ Create account
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
      
        // 2️⃣ Initialize Metadata Pointer EXTENSION FIRST
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID,
        ),
      
        // 3️⃣ NOW initialize mint
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          mintDecimals,
          wallet.publicKey,
          formData.mintAuthority ? wallet.publicKey : null,
          TOKEN_2022_PROGRAM_ID,
        ),
      
        // 4️⃣ Initialize metadata
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        }),
      );
      
      

      tx.feePayer = wallet.publicKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      tx.partialSign(mintKeypair);

      const sim = await connection.simulateTransaction(tx);
      console.log(sim.value.logs);


      // Send create mint/metadata transaction
      const sig1 = await wallet.sendTransaction(tx, connection, { signers: [mintKeypair] });
      setTxSignature(sig1);

      // Associated Token Address
      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
      );

      // Create associated token account
      const tx2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        ),
      );
      const sig2 = await wallet.sendTransaction(tx2, connection);
      await connection.confirmTransaction(sig2, "confirmed");

      // Mint tokens to owner - use totalSupply entered by user, adjusted for decimals
      const decimalsMultiplier = BigInt(10) ** BigInt(mintDecimals);
      const supply = BigInt(formData.totalSupply || "0") * decimalsMultiplier;
      const tx3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          supply,
          [],
          TOKEN_2022_PROGRAM_ID,
        ),
      );
      const sig3 = await wallet.sendTransaction(tx3, connection);
      await connection.confirmTransaction(sig3, "confirmed");
      setIsLoading(false);
      setSubmitError(null);
      return;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Token creation failed";
      console.log(err);
      setSubmitError(errorMsg);
      setIsLoading(false);
    }
  };

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
              <Coins className="w-6 h-6 text-blue-400" />
            </div>
            Create Your Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transaction result/Signature display */}
          {txSignature && (
            <div className="p-4 text-green-400 bg-green-900/30 border border-green-400/20 rounded mb-4 break-all">
              <span className="font-semibold">Token Created! <br />Tx Signature: </span>
              <a
                href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline break-all"
              >
                {txSignature}
              </a>
            </div>
          )}
          {submitError && (
            <div className="p-4 text-red-400 bg-red-900/20 border border-red-400/20 rounded mb-4">
              Error: {submitError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Token Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-gray-300">
                <Coins className="w-4 h-4" />
                Token Name
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. My Awesome Token"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Token Symbol */}
            <div className="space-y-2">
              <Label htmlFor="symbol" className="flex items-center gap-2 text-gray-300">
                <Hash className="w-4 h-4" />
                Token Symbol
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="symbol"
                  type="text"
                  placeholder="e.g. MAT"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange("symbol", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Decimals */}
            <div className="space-y-2">
              <Label htmlFor="decimals" className="flex items-center gap-2 text-gray-300">
                <Calculator className="w-4 h-4" />
                Decimals
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="decimals"
                  type="number"
                  min="0"
                  max="18"
                  placeholder="9"
                  value={formData.decimals}
                  onChange={(e) => handleInputChange("decimals", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Total Supply */}
            <div className="space-y-2">
              <Label htmlFor="totalSupply" className="flex items-center gap-2 text-gray-300">
                <Calculator className="w-4 h-4" />
                Total Supply
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="totalSupply"
                  type="number"
                  placeholder="1000000"
                  value={formData.totalSupply}
                  onChange={(e) => handleInputChange("totalSupply", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Token Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2 text-gray-300">
                <Hash className="w-4 h-4" />
                Description
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="description"
                  type="text"
                  placeholder="A short token description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Image URL input */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="flex items-center gap-2 text-gray-300">
                <ImageIcon className="w-4 h-4" />
                Token Image URL
              </Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Mint Authority Toggle */}
            <div className="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="mintAuthority" className="flex items-center gap-2 text-gray-300">
                  <Settings className="w-4 h-4" />
                  Enable Mint Authority
                </Label>
                <p className="text-sm text-gray-400">
                  Allow additional tokens to be minted after creation
                </p>
              </div>
              <Switch
                id="mintAuthority"
                checked={formData.mintAuthority}
                onCheckedChange={(checked) =>
                  handleInputChange("mintAuthority", checked)
                }
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedButton
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full text-lg py-6"
              >
                {isLoading ? "Creating Token..." : "Create Token"}
              </AnimatedButton>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
