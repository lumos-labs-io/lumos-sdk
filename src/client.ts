import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import type { ArticleBill, LumosConfig, WalletLike } from "./types";

async function getBlockhash(apiBase: string) {
  const r = await fetch(`${apiBase}/solana/blockhash`);
  return r.json(); // { blockhash, lastValidBlockHeight }
}

async function sendRaw(apiBase: string, txBase64: string) {
  const r = await fetch(`${apiBase}/solana/send`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ txBase64 })
  });
  return r.json(); // { signature } or { error }
}

export async function paySolLegacy(
  cfg: LumosConfig,
  wallet: WalletLike,
  amountSOL: number,
  memo?: string
): Promise<string> {
  const apiBase = cfg.apiBase ?? "/api";
  const bh = await getBlockhash(apiBase);
  const tx = new Transaction({
    feePayer: wallet.publicKey as any,
    recentBlockhash: bh.blockhash
  }).add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey as any,
      toPubkey: new PublicKey(cfg.receiver),
      lamports: Math.round(amountSOL * 1e9)
    })
  );

  const signed = await wallet.signTransaction(tx as any);
  const raw = (signed as any).serialize();
  const base64 = Buffer.from(raw).toString("base64");
  const sent = await sendRaw(apiBase, base64);
  if (sent.error) throw new Error(sent.error.message || "sendRawTransaction failed");
  return sent.signature as string;
}

export async function unlockResource(endpoint: string) {
  const res = await fetch(endpoint, { headers: { "x-lumos-paid": "true" } });
  return res;
}

export async function getX402(endpoint: string): Promise<{ bill: ArticleBill } | null> {
  const res = await fetch(endpoint);
  if (res.status !== 402) return null;
  const bill = await res.json();
  return { bill };
}
