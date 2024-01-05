import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';

import Button from '@/components/button';
import AccountDetailsView from '@/components/account-details-view';

function EthersMetamasWalletConnect() {
	// Using Viem Client
	const ethersConnectWalletMutation = useMutation({
		mutationFn: () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const provider = new ethers.BrowserProvider((window as any).ethereum);
			return provider.send('eth_requestAccounts', []);
		}
	});

	const connectedAddress = ethersConnectWalletMutation?.data?.[0];

	async function connectUsingEthers() {
		// connect to account means invoking the `eth_requestAccounts` from the EIP 1102: https://eips.ethereum.org/EIPS/eip-1102
		// Any wallet should confirm to this
		ethersConnectWalletMutation.mutate();
	}

	return (
		<div className="flex flex-col items-center">
			<Button onClick={connectUsingEthers} disabled={ethersConnectWalletMutation.isPending || !!connectedAddress}>
				Connect Metamask (using Ethers)
			</Button>

			<AccountDetailsView
				connectedAddress={connectedAddress ?? null}
				isPendingConnection={ethersConnectWalletMutation.isPending}
			/>
		</div>
	);
}

export default EthersMetamasWalletConnect;
