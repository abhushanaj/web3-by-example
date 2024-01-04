import { useMutation } from '@tanstack/react-query';

type Props = {
	title: string;
	info: string;
	actionCallback: () => Promise<unknown>;
};

function customFormatter(_: string, value: unknown) {
	if (typeof value === 'bigint') {
		return value.toString();
	}

	return value;
}

function EthTransactSection({ title, info, actionCallback }: Props) {
	const { isPending, data, error, mutate, reset } = useMutation({
		mutationFn: actionCallback
	});

	function handleClick() {
		mutate();
	}

	return (
		<section className="my-2 border-b-2 border-slate-200 pb-4">
			<h1 className="mb-2 text-xl font-bold text-neutral-900">{title}</h1>

			<p className="mb-2 text-gray-900">{info}</p>

			<div className="flex flex-col gap-4">
				<button
					type="button"
					className="rounded-md bg-cyan-500 px-[12px] py-[8px] text-white hover:bg-cyan-600 disabled:bg-gray-400"
					onClick={handleClick}
					disabled={isPending}
				>
					Transact
				</button>

				<div>
					<div className="mb-2 flex items-center gap-2">
						<h2 className=" text-xl font-bold text-neutral-900">Result:</h2>

						<button
							type="button"
							className="rounded-sm bg-red-500 px-1  text-white disabled:bg-gray-400"
							disabled={isPending || !data}
							onClick={reset}
						>
							Clear
						</button>
					</div>

					{isPending && <p className="mb-2 text-gray-900">Pending ....</p>}

					{!isPending && !error && !!data && (
						<pre className="max-h-[800px] overflow-auto bg-gray-900 p-3 text-white">
							<code>{JSON.stringify(data, customFormatter, 2)}</code>
						</pre>
					)}

					{error && (
						<pre className="max-h-[800px] overflow-auto bg-red-500 p-3 text-white">
							<code>{JSON.stringify(error, customFormatter, 2)}</code>
						</pre>
					)}
				</div>
			</div>
		</section>
	);
}

export default EthTransactSection;
