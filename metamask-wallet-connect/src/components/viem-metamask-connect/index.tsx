import { useMutation } from '@tanstack/react-query';
import { createWalletClient, custom } from 'viem';

import Button from '@/components/button';
import AccountDetailsView from '../account-details-view';

function ViemMetamaskWalletConnect() {
	const viemClient = createWalletClient({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		transport: custom((window as any).ethereum)
	});

	// Using Viem Client
	const viemConnectWalletMutation = useMutation({
		mutationFn: viemClient.requestAddresses
	});

	const connectedAddress = viemConnectWalletMutation?.data?.[0];

	async function connectUsingViem() {
		viemConnectWalletMutation.mutate();
	}

	return (
		<div className="flex flex-col items-center">
			<Button onClick={connectUsingViem} disabled={viemConnectWalletMutation.isPending || !!connectedAddress}>
				Connect Metamask (using Viem)
			</Button>

			<AccountDetailsView
				connectedAddress={connectedAddress ?? null}
				isPendingConnection={viemConnectWalletMutation.isPending}
			/>
		</div>
	);
}

export default ViemMetamaskWalletConnect;
