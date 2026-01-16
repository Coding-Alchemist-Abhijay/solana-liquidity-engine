import { NextRequest, NextResponse } from "next/server";
import {
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  CREATE_CPMM_POOL_PROGRAM,
  CREATE_CPMM_POOL_FEE_ACC,
  getCpmmPdaAmmConfigId,
  getCreatePoolKeys,
  makeCreateCpmmPoolInInstruction,
} from "@raydium-io/raydium-sdk-v2";
import BN from "bn.js";

export async function POST(req: NextRequest) {
  try {
  const {
    wallet,
    tokenAMint,
    tokenBMint,
    tokenADecimals,
    tokenBDecimals,
    // initial liquidity deposit amounts (human units, e.g. "1.23")
    tokenAAmount,
    tokenBAmount,
  } = await req.json();
  if (
    !wallet ||
    !tokenAMint ||
    !tokenBMint ||
    tokenADecimals === undefined ||
    tokenBDecimals === undefined ||
    // allow initialPrice to be optional for CPMM
    tokenAAmount === undefined ||
    tokenBAmount === undefined
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing required fields. Required: wallet, tokenAMint, tokenBMint, tokenADecimals, tokenBDecimals, tokenAAmount, tokenBAmount",
      },
      { status: 400 }
    );
  }
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const owner = new PublicKey(wallet);
  const mintA = new PublicKey(tokenAMint);
  const mintB = new PublicKey(tokenBMint);

  // --- CPMM constant-product pool (no OpenBook market) ---
  const programId = CREATE_CPMM_POOL_PROGRAM;
  // use default config index 0 for now
  const configId = getCpmmPdaAmmConfigId(programId, 0).publicKey;
  const poolFeeAccount = CREATE_CPMM_POOL_FEE_ACC;

  const poolKeys = getCreatePoolKeys({
    programId,
    configId,
    mintA,
    mintB,
  });

  const scaleToBN = (amount: number, decimals: number) => {
    const s = String(amount);
    const [i, f = ""] = s.split(".");
    const frac = (f + "0".repeat(decimals)).slice(0, decimals);
    return new BN(i + frac);
  };
  const coinAmount = scaleToBN(Number(tokenAAmount), Number(tokenADecimals));
  const pcAmount = scaleToBN(Number(tokenBAmount), Number(tokenBDecimals));

  const userCoinVault = getAssociatedTokenAddressSync(mintA, owner, false, TOKEN_PROGRAM_ID);
  const userPcVault = getAssociatedTokenAddressSync(mintB, owner, false, TOKEN_PROGRAM_ID);
  const userLpVault = getAssociatedTokenAddressSync(poolKeys.lpMint, owner, false, TOKEN_PROGRAM_ID);

  const openTime = new BN(Math.floor(Date.now() / 1000));

  const instruction = makeCreateCpmmPoolInInstruction(
    programId,
    owner,
    configId,
    poolKeys.authority,
    poolKeys.poolId,
    mintA,
    mintB,
    poolKeys.lpMint,
    userCoinVault,
    userPcVault,
    userLpVault,
    poolKeys.vaultA,
    poolKeys.vaultB,
    poolFeeAccount,
    TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    poolKeys.observationId,
    coinAmount,
    pcAmount,
    openTime,
  );

  const transaction = new Transaction();
  transaction.add(instruction);
  transaction.feePayer = owner;

  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  transaction.recentBlockhash = blockhash;

  return NextResponse.json({
    success: true,
    transaction: transaction
      .serialize({ requireAllSignatures: false })
      .toString("base64"),
    poolId: poolKeys.poolId.toBase58(),
    poolAddress: poolKeys.poolId.toBase58(),
    // Additional helpful info
    network: "devnet",
    explorerUrl: `https://solscan.io/account/${poolKeys.poolId.toBase58()}?cluster=devnet`,
  });

  } catch (err: unknown) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}