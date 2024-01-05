import { useMutation } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { SwitchChainParameters, createPublicClient, createWalletClient, custom, formatEther } from 'viem';

import { mainnet, sepolia, goerli, linea, hardhat } from 'viem/chains';

import Footer from '@/components/footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const chainSelectionOptions = [
	{
		name: mainnet.name,
		chainId: mainnet.id
	},
	{
		name: sepolia.name,
		chainId: sepolia.id
	},
	{
		name: goerli.name,
		chainId: goerli.id
	},
	{
		name: linea.name,
		chainId: linea.id
	},
	{
		name: hardhat.name,
		chainId: hardhat.id
	}
];

const walletClient = createWalletClient({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transport: custom((window as any).ethereum)
});

const publicClient = createPublicClient({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transport: custom((window as any).ethereum)
});

function App() {
	useDocumentTitle('Multi Chain Switch and Connect');

	const {
		mutate: getBalance,
		isPending: gettingBalancePending,
		error: gettingBalanceError,
		data: balance,
		reset: getBalanceReset
	} = useMutation({
		mutationFn: async () => {
			const [address] = await walletClient.requestAddresses();
			return publicClient.getBalance({
				address
			});
		}
	});

	const { mutate, isPending, error } = useMutation({
		mutationFn: (payload: SwitchChainParameters) => walletClient.switchChain(payload),
		onMutate() {
			getBalanceReset();
		}
	});

	async function handleChainSwitch(e: ChangeEvent<HTMLSelectElement>) {
		e.preventDefault();

		const { value } = e.target;

		const chainId = parseInt(value, 10);

		// This is based on off EIP-3326 https://eips.ethereum.org/EIPS/eip-3326
		// we should call wallet_switchEthereumChain if using native providers from windows

		// calls the wallet_switchEthereumChain
		if (chainId) {
			mutate({
				id: chainId
			});
		}
	}

	return (
		<>
			<main className="flex flex-col items-center justify-center">
				<h1 className="mb-6 text-3xl font-bold text-neutral-900">Multi Chain Switch and Connect 😇</h1>

				<select
					name="selectedChain"
					id="chainSelection"
					className="text-neutral-95 cursor-pointer rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2 hover:bg-neutral-200"
					onChange={handleChainSwitch}
				>
					{chainSelectionOptions.map((chain) => (
						<option value={chain.chainId} key={chain.chainId}>
							{chain.name}
						</option>
					))}
				</select>

				<div className="my-6 text-center">
					{!isPending && <p className="mb-2 text-neutral-950">Switch chain from above 👆</p>}
					{isPending && <p className="mb-2 text-neutral-950">Pending...</p>}
					{!!error && <p className="mb-2 text-red-500">{error.message}</p>}
				</div>

				<div className=" flex w-full flex-col items-center border-b border-neutral-200 py-6">
					<button
						type="button"
						className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
						disabled={gettingBalancePending}
						onClick={() => {
							getBalance();
						}}
					>
						{gettingBalancePending ? 'Pending...' : 'Get Balance'}
					</button>

					{balance?.toString() && <p className="my-2 text-green-500">{formatEther(balance)}</p>}

					{!!gettingBalanceError && <p className="mb-2 text-red-500">{gettingBalanceError.message}</p>}
				</div>
			</main>

			<Footer />
		</>
	);
}

export default App;
