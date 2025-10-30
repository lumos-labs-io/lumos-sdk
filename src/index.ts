export * from "./types";
export * from "./verify";
export * from "./client";

import type { LumosConfig, WalletLike } from "./types";
import { getX402, unlockResource, paySolLegacy } from "./client";
import { verifyTx } from "./verify";

export const Lumos = {
  async payVerifyUnlock(opts: {
    endpoint: string;
    cfg: LumosConfig;
    wallet: WalletLike;
  }): Promise<Response> {
    const x = await getX402(opts.endpoint);
    if (!x) {
      // already accessible
      return fetch(opts.endpoint);
    }
    const { amount, memo } = x.bill;
    const sig = await paySolLegacy(opts.cfg, opts.wallet, Number(amount), memo);
    const apiBase = opts.cfg.apiBase ?? "/api";
    const ok = await verifyTx(apiBase, sig, amount, memo);
    if (!ok?.ok) throw new Error(ok?.error || "Verification failed");
    return unlockResource(opts.endpoint);
  }
};
