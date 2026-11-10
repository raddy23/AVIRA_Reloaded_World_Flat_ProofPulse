# AVIRA_Reloaded_World_Flat_ProofPulse

**AVIRA ProofPulse — From software incidents to signed evidence and optional real $WIF payments**  
World Is Flat Hackathon 2026 · Solo developer: Rahul Ashokrao Dhapatkar (Pune, India)

## What works today

1. Create a clearly identified **synthetic** API incident (HTTP 503 failure or HTTP 200 healthy).
2. Open a verification challenge and recheck the incident with a new observation.
3. Generate SHA-256 evidence fingerprints and **genuinely Ed25519-signed receipts**. Verify signatures via an API action and download JSON evidence.
4. Connect a compatible browser wallet on Robinhood Chain mainnet (chain ID 4663) **without sending anything**.
5. If a participant willingly authorizes payment from a funded wallet, send an actual $WIF ERC-20 transfer to a **different contributor**. The server queries Robinhood Chain RPC to confirm the successful transaction, original sender, recipient, amount, official token and Transfer event before adding payment proof to the incident.
6. View persistent incident history and verified transaction explorer links.

**Not implemented:** smart-contract escrow, automatic adjudication, trustless third-party verification, paid-bounty marketplace, actual detection of arbitrary production API failures, guaranteed payouts. The blockchain transaction is **not complete** until a participant explicitly signs and funds a real payment. Local tests do not constitute mainnet payment proof. This code is a prototype, not audited financial infrastructure.

## Start on Windows (PowerShell)

Install [Node.js LTS](https://nodejs.org/en/download) (20+), extract the ZIP, and run:

```powershell
cd "$HOME\Downloads\AVIRA_Reloaded_World_Flat_ProofPulse"
npm.cmd test
npm.cmd start
```

Open **http://localhost:8081** in your browser. Alternatively, right-click `START_HERE_WINDOWS.ps1` and run it from PowerShell (using your own script execution policy).

If the ZIP extracted into another folder, use that folder. No `npm install` or external packages are needed for the local server and demo.

### Full local demo (no cryptocurrency needed)

1. Click **Create incident & sign evidence**. HTTP 503 is the default **synthetic** outage.
2. Click **Open verification challenge**.
3. Select `HTTP 200 · possible recovery` and click **Recheck and sign**.
4. Click **Verify Ed25519 receipt** — should display `PASS`.
5. Click **Download JSON evidence** and inspect the signed receipt and history.
6. The wallet payment button remains disabled if you have not connected a wallet. That's intentional.

### Test complete local API

```powershell
npm.cmd test
```

The test suite covers local create → receipt → challenge → recheck → verify → persistence; signature tamper detection; deterministic evidence hashes; ERC-20 transfer encoding; and good/bad WIF event receipt validation. Browser smoke testing was blocked by the isolated tool environment; run the local browser click-through as above.

## Optional real $WIF transfer

**Only perform this if you fully understand the risks and want to transact. You do not need to buy crypto merely to enter the hackathon.**

- Add a compatible EVM wallet (MetaMask, Rabby or another provider) to your browser. **Do not share seed phrases or private keys.**
- Fund it only with tokens and ETH gas you can afford to lose. Transactions are irreversible. Real tokens are volatile.
- Verify official Robinhood Chain mainnet network details **chain ID 4663**, and verify the `$WIF` token address against the organizer's website before sending.
- After completing a challenge and a recheck, select **Connect wallet**. This connects and switches network but does not send assets.
- Enter a real contributor public address and payment amount. Review every displayed detail in the wallet and approve only if correct.
- The app submits `transfer(address,uint256)` **directly to the official `$WIF` ERC-20 token**, waits for transaction confirmation, then asks the server to verify the receipt through the official RPC. Transaction hashes and block explorer links are then stored against the incident.
- No token approval/allowance is requested. **No escrow contract is deployed by this project.**

### Network settings (official)

| Field | Value |
|---|---|
| Chain ID | `4663` |
| Public RPC | `https://rpc.mainnet.chain.robinhood.com` |
| Gas token | ETH |
| Explorer | `https://robinhoodchain.blockscout.com` |
| $WIF token (organizer's site) | `0x5173b8eA6923c2d40267890D45C46a3480954773` |

Sources: [Robinhood Chain connecting guide](https://docs.robinhood.com/chain/connecting/) and [World Is Flat official token page](https://worldisflat.fun/).

**Do not call the optional transfer production-tested** until a real successful transaction is visible in the explorer and matched by the in-app confirmation.

## Deploy for judges

Supports any Node.js host: start command `npm start`, health path `/api/config`, set `PORT` as provided by your host. For persistent evidence and signing keys, configure `PROOFPULSE_DATA_DIR` to a persistent volume; an ephemeral volume loses local incident data and signing keys on redeploy. HTTPS is required for normal wallet browser extensions on publicly hosted sites. Never publish files from `data/`. Do not set broad wallet/CORS permissions or expose the signing private key. This prototype has **no login, rate limiting, multi-user authorization, or full security audit**; host a limited demo instance only, not a production financial service.

## Hackathon submission framing

**What it does:** Turns a synthetic reported incident into an evidence challenge, creates reproducible check observations, signs proof, and provides an opt-in, wallet-authorized *real* $WIF token transfer to reward a contributor. The latter is conditional on a real funded wallet and chain confirmation. No automatic on-chain escrow.

**Integration type:** `$WIF is the fee or payment` (direct transfer implementation).  
**Contract addresses:** None deployed by this product; use the ERC-20 WIF contract for direct transfers. Do not claim a proprietary deployed contract address.  
**Prize requirement:** Event organizers require live functioning software, real Robinhood Chain transactions, an accessible repository, video demo and ongoing availability. Code alone does not satisfy the genuine transactions rule.

## Files

- `server.js`: no-dependency HTTP JSON API and signed evidence persistence.
- `lib/proof.js`: SHA-256, Ed25519 and incident checks.
- `lib/chain.js`: token transfer ABI encoding and strict on-chain event matching.
- `public/index.html`, `public/style.css`, `public/app.js`: responsive grey UI and wallet interaction.
- `tests/`: local automated tests.
- `docs/`: implementation notes and test evidence.

## Disclaimer

No token purchase is needed to run the demo. Do not provide private keys, seed phrases, or passwords to any application. The $WIF token is volatile and may have no intrinsic value. Open source code alone does not show a real on-chain transaction; a confirmed explorer hash is required.
