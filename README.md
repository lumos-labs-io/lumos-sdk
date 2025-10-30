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

Copyright (c) 2025 Lumos Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


MIT
