import { createPublicClient, custom, formatEther } from 'viem';
import { sepolia } from 'viem/chains';

import Footer from '@/components/footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import EthTransactSection from './components/eth-transact-section';

function App() {
	useDocumentTitle('React Starter');

	const client = createPublicClient({
		chain: sepolia,

		transport: custom(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).ethereum
			/*
			 * Metamask wallet exposes a provider into window.ethereum as per rule of EIP
			 */
		)
	});

	async function getBlockDetails() {
		return {
			blockNumber: await client.getBlockNumber(),
			block: await client.getBlock(),
			blockTransactionCount: await client.getBlockTransactionCount()
		};
	}

	async function getAccountDetails() {
		const balance = await client.getBalance({
			address: '0xB999d4f182997141a42B6764660C61AeD197B59c'
		});
		return {
			balance,
			[`balance (${sepolia.nativeCurrency.name})`]: `${formatEther(balance)} ${sepolia.nativeCurrency.symbol}`,
			transactionCount: await client.getTransactionCount({
				address: '0xB999d4f182997141a42B6764660C61AeD197B59c'
			})
		};
	}

	async function getChainDetails() {
		return {
			chainId: await client.getChainId()
		};
	}

	return (
		<>
			<main className="pt-10">
				<h1 className="mb-8 text-3xl font-bold text-neutral-900">Basic interactions with chain 🚀 </h1>

				<EthTransactSection
					title="Block Details"
					info="Get the current block details of the connected chain"
					actionCallback={getBlockDetails}
				/>

				<EthTransactSection
					title="Account Details of 0xB999d4f182997141a42B6764660C61AeD197B59c"
					info="Get the account details like balance and total transactions done"
					actionCallback={getAccountDetails}
				/>

				<EthTransactSection
					title="Chain Details"
					info={`Get the chain details for ${sepolia.name}`}
					actionCallback={getChainDetails}
				/>
			</main>

			<Footer></Footer>
		</>
	);
}

export default App;
