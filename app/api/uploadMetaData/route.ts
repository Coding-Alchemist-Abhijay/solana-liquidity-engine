// app/api/uploadMetaData/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { metadata } = await req.json();

    if (!metadata) {
      throw new Error("metadata missing");
    }

    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
      throw new Error("PINATA_JWT missing");
    }

    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Pinata error: ${text}`);
    }

    const data = await res.json();

    return NextResponse.json({
      uri: `https://ipfs.io/ipfs/${data.IpfsHash}`,
    });
  } catch (err: any) {
    console.error("UPLOAD METADATA ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
