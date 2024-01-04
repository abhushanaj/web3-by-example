import { GetBalanceParameters, createPublicClient, createWalletClient, custom, formatEther } from 'viem';
import type { ComponentProps } from 'react';
import { useMutation } from '@tanstack/react-query';

import Footer from '@/components/footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

function Button({ className, children, type = 'button', ...otherBtnProps }: ComponentProps<'button'>) {
	return (
		<button
			type={type}
			className={`rounded bg-neutral-900 px-2 py-3 text-white hover:bg-neutral-800 disabled:bg-gray-400 ${className}`}
			{...otherBtnProps}
		>
			{children}
		</button>
	);
}

function App() {
	useDocumentTitle('React Starter');

	const viemClient = createWalletClient({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		transport: custom((window as any).ethereum)
	});

	const publiClient = createPublicClient({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		transport: custom((window as any).ethereum)
	});

	const viemConnectWalletMutation = useMutation({
		mutationFn: viemClient.requestAddresses
	});

	const accountDetailsMutation = useMutation({
		mutationFn: (payload: GetBalanceParameters) => publiClient.getBalance(payload)
	});

	const connectedAddress = viemConnectWalletMutation?.data?.[0];

	async function connectUsingViem() {
		// connect to account means invoking the `eth_accounts` from the EIP 1102: https://eips.ethereum.org/EIPS/eip-1102
		// Any wallet should confirm to this
		viemConnectWalletMutation.mutate();
	}

	async function getBalance() {
		if (connectedAddress) {
			accountDetailsMutation.mutate({ address: connectedAddress });
		}
	}

	return (
		<>
			<main className="flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold text-neutral-900">Connect to Metamask wallet 🎉</h1>

				<p className="my-3">Status: {connectedAddress ? 'Connected ✅' : 'Disconnected 🔴'}</p>

				{viemConnectWalletMutation.isPending && <p className="my-3">Connecting...</p>}

				{connectedAddress && (
					<div className="my-3 flex flex-col gap-3">
						<p>Account Address: {connectedAddress}</p>

						<button
							className="rounded-md bg-cyan-500 px-2 py-[8px] text-white"
							onClick={getBalance}
							disabled={accountDetailsMutation.isPending}
						>
							{accountDetailsMutation.isPending ? 'Getting balance' : 'Get balance'}
						</button>

						{!!accountDetailsMutation.data && (
							<>
								<p className="text-center font-medium text-green-500">
									Balance is: {accountDetailsMutation.data.toString()} gwie
								</p>
								<p className="text-center font-medium text-green-500">
									Balance is: {formatEther(accountDetailsMutation.data)} ETH
								</p>
							</>
						)}
					</div>
				)}

				{viemConnectWalletMutation.error && (
					<p className="my-3 text-red-500">{viemConnectWalletMutation.error.message}</p>
				)}

				<div className="mt-6 flex flex-col gap-6">
					<Button onClick={connectUsingViem} disabled={viemConnectWalletMutation.isPending}>
						Connect (using Viem)
					</Button>

					<Button disabled={viemConnectWalletMutation.isPending}>Connect (using Ethers)</Button>

					<Button disabled={viemConnectWalletMutation.isPending}>Connect (injected provider)</Button>
				</div>
			</main>

			<Footer />
		</>
	);
}

export default App;
