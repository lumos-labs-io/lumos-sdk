export type Base64 = string;

export interface WalletLike {
  publicKey: { toBase58(): string };
  signTransaction(tx: any): Promise<any>;
}

export interface LumosConfig {
  apiBase?: string; // e.g. "", "/api", or "https://your.site/api"
  receiver: string; // SOL destination (your creator wallet)
}

export interface ArticleBill {
  protocol: "x402";
  chain: "solana";
  amount: string; // e.g. "0.01"
  memo: string;   // e.g. "article_42"
}

export interface VerifyResult {
  ok: boolean;
  error?: string;
}
