import Footer from '@/components/footer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

function App() {
	useDocumentTitle('React Starter');
	return (
		<>
			<main className="flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold text-neutral-900">React Starter</h1>
			</main>

			<Footer></Footer>
		</>
	);
}

export default App;
