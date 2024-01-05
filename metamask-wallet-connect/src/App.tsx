import Footer from '@/components/footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import ViemMetamaskWalletConnect from '@/components/viem-metamask-connect';
import EthersMetamasWalletConnect from '@/components/ethers-metamask-connect';
import EipInjectedProviderWalletConnect from '@/components/eip-injected-provider';

function App() {
	useDocumentTitle('React Starter');

	return (
		<>
			<main className="flex flex-col items-center justify-center">
				<h1 className="mb-8 text-3xl font-bold text-neutral-900">Connect to Metamask wallet 🎉</h1>

				{/* Using Viem Client */}
				<section className=" border-b-2 border-slate-200 py-2">
					<ViemMetamaskWalletConnect />
				</section>

				{/* Using Ethers Client */}
				<section className=" border-b-2 border-slate-200 py-2">
					<EthersMetamasWalletConnect />
				</section>

				{/* Using injected EIP Provider */}
				<section className=" border-b-2 border-slate-200 py-2">
					<EipInjectedProviderWalletConnect />
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
