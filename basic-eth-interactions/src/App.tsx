import { createPublicClient, custom } from 'viem';
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

	return (
		<>
			<main className="pt-10">
				<h1 className="mb-8 text-3xl font-bold text-neutral-900">Basic interactions with chain</h1>

				{/* Getting the block Detials */}
				<EthTransactSection
					title="Getting Block Details"
					info="Get the current block details of the connected chain"
					actionCallback={getBlockDetails}
				/>
			</main>

			<Footer></Footer>
		</>
	);
}

export default App;
