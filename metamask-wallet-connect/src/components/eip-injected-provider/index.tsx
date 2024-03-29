import { useMutation } from '@tanstack/react-query';

import Button from '@/components/button';
import AccountDetailsView from '@/components/account-details-view';

function EipInjectedProviderWalletConnect() {
	// Using Viem Client
	const ethersConnectWalletMutation = useMutation<string[]>({
		mutationFn: () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const provider = (window as any).ethereum;
			return provider.request({ method: 'eth_requestAccounts', params: [] });
		}
	});

	const connectedAddress = ethersConnectWalletMutation?.data?.[0];

	async function connectUsingWindowProvider() {
		ethersConnectWalletMutation.mutate();
	}

	return (
		<div className="flex flex-col items-center">
			<Button
				onClick={connectUsingWindowProvider}
				disabled={ethersConnectWalletMutation.isPending || !!connectedAddress}
			>
				Connect Metamask (using EIP provider directly)
			</Button>

			<AccountDetailsView
				connectedAddress={connectedAddress ?? null}
				isPendingConnection={ethersConnectWalletMutation.isPending}
			/>
		</div>
	);
}

export default EipInjectedProviderWalletConnect;
