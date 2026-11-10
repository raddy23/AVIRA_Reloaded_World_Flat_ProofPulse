# ProofPulse blockchain completion checklist

**Do not claim an end-to-end Robinhood Chain integration is complete unless a real funded WIF transfer is confirmed.**

- [x] Official Robinhood Chain network configuration: 4663, ETH for gas, RPC, explorer.
- [x] Official WIF address from organizer website, referenced in app.
- [x] Optional wallet-connect flow with explicit wallet permission (no private-key collection).
- [x] Direct WIF transfer calldata generation, no standing approvals.
- [x] Back-end chain receipt verification with token, sender, recipient, amount, block and receipt status.
- [x] Local unit tests for valid and invalid transaction receipt evidence.
- [x] Local incident, recheck, cryptographic signature API integration tests.
- [ ] Live browser wallet permission and wallet UI on a user's machine.
- [ ] Actual mainnet WIF transfer signed by a funded wallet.
- [ ] Public explorer proof (real transaction hash).
- [ ] Publicly accessible HTTPS deployment with persistent storage.
- [ ] Public demonstration video, verified readable without login.
- [ ] Final competition submission confirmation.

## Updated submission selection
Integration: **$WIF is the fee or payment**. The current approach is **direct ERC-20 transfer**, not escrow. The repo does not deploy a custom contract, so leave own contract addresses empty. A direct payment is verified only after a confirmed real transaction.
