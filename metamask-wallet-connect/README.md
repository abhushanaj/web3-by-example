# Metamask Wallet Connect

Connect to the metamask wallet and get the account public key using [Viem](https://viem.sh/), [Ethers](https://docs.ethers.org/v5/) and native [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) injected JS provider.

EIP-1102 lays the rules to have consistent Provider API's for clients.

At the end, we need to invoke `eth_requestAccounts` which returns us either the address directly if already connected and given permissions or asks for permissions and then send account address.

It be abstracted in whatever way possible from different clients like `walletClient.requestAddresses()` from viem, `provider.send('eth_requestAccounts', []);` from ethers or `provider.request({ method: 'eth_requestAccounts', params: [] })` from metamask injected provider.

![Screenshot 2024-01-05 093617](https://github.com/abhu-A-J/web3-by-example/assets/49617450/6a17ed35-8754-4c9a-bc18-ac82068fd00f)
