# AVIRA_Reloaded_World_Flat_ProofPulse

**AVIRA ProofPulse — From software incidents to signed evidence and optional real $WIF payments**  
World Is Flat Hackathon 2026 · Solo developer: Rahul Ashokrao Dhapatkar (Pune, India)

AVIRA ProofPulse serves software developers, QA engineers, DevOps/SRE teams, API operators, businesses, and independent verifiers across automotive, fintech, e-commerce, cloud/SaaS, IoT, and enterprise software. Teams benefit from faster incident investigation, repeatable verification, and trustworthy evidence. Independent contributors could earn $WIF for approved verification challenges once the proposed on-chain reward system is operational. Rewards are not currently available or guaranteed.
**Problem:** Software developers, QA engineers, DevOps teams, and businesses face recurring API failures, difficult-to-reproduce bugs, and unreliable incident evidence. Existing monitoring tools detect failures, while testing and bug-tracking tools handle separate parts of the investigation. Connecting these activities into a trustworthy, independently verifiable process often requires considerable manual effort.

**Our Solution:** AVIRA ProofPulse transforms software failures into structured, reproducible verification challenges. It combines API health monitoring, HTTP 200/503 incident detection, challenge-and-recheck operations, SHA-256 evidence fingerprints, Ed25519 digitally signed receipts, and downloadable investigation reports.

**Our Unique Innovation and USP — Evidence-to-Reward Verification Loop:**

**Detect → Reproduce → Challenge → Verify → Generate Proof → Reward → Repeat**

Unlike a conventional failure-alert dashboard, ProofPulse aims to connect technical evidence, independent verification, and participation incentives in one continuous workflow.

**What Makes It Different:**

1. **Failure-to-Proof:** Converts an incident into a repeatable verification challenge rather than simply generating an alert.
2. **Evidence Integrity:** Produces cryptographic fingerprints and signed receipts to support independent evidence-integrity checks.
3. **Challenge-and-Recheck:** Enables repeatable verification and comparison of incident observations.
4. **$WIF-Powered Rewards (Proposed):** Introduces an intended mechanism for rewarding verified contributions through Robinhood Chain.
5. **Recurring Participation Flywheel (Proposed):** New incidents generate challenges, contributors verify evidence, rewards encourage participation, and subsequent challenges bring users back.

**Why It Is Valuable:** ProofPulse aims to reduce manual investigation effort, improve evidence traceability, strengthen verification accountability, and create a practical incentive for independent technical contributions.
**AVIRA ProofPulse is designed for software developers, QA engineers, DevOps and SRE teams, API service operators, businesses, and independent technical contributors.**

**Target Industries:** Automotive and mobility, banking and fintech, e-commerce, cloud and SaaS, telecommunications, IoT, healthcare technology, enterprise software, and open-source communities.

**How Users Benefit:** Developers can investigate and reproduce failures more efficiently; businesses can reduce manual verification costs and improve technical accountability; and independent contributors can participate in evidence-based verification challenges.

**How Users Could Earn:** Once the proposed Robinhood Chain integration is operational, eligible contributors could earn $WIF rewards by successfully completing independently verified software challenges.

**Value to the $WIF Ecosystem:** Recurring software incidents create opportunities for new verification challenges and repeat participation, providing a potential utility for $WIF beyond one-time transactions.

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
