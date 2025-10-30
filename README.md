# @lumos/sdk ⚡

Lumos SDK for building x402-based instant paywalls on Solana.

## Install
```bash
npm install @lumos/sdk @solana/web3.js
```
**Usage**
```ts
import { Lumos } from "@lumos/sdk";

const res = await Lumos.payVerifyUnlock({
  endpoint: "/api/article?id=42",
  cfg: { apiBase: "/api", receiver: "HWAyopVZUZkboNQEkKMNpYa4oUU8vR9eT59UMqzjLe7x" },
  wallet
});
```
This expects your backend to expose:
- GET /api/article (returns 402 with bill or 200)
- GET /api/solana/blockhash
- POST /api/solana/send
- POST /api/verify

### `LICENSE`

MIT
