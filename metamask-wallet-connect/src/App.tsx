import Footer from '@/components/footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import ViemMetamaskWalletConnect from '@/components/viem-metamask-connect';

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
			</main>

			<Footer />
		</>
	);
}

export default App;
