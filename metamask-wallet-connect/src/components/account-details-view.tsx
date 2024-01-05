type Props = {
	connectedAddress: string | null;
	isPendingConnection: boolean;
};

function AccountDetailsView({ connectedAddress, isPendingConnection }: Props) {
	return (
		<div className="flex flex-col items-center">
			<p className="my-3">Status: {connectedAddress ? 'Connected ✅' : 'Disconnected 🔴'}</p>
			{isPendingConnection && <p className="my-3">Connecting...</p>}

			{connectedAddress && (
				<div className="my-3 flex flex-col gap-3">
					<p>Account Address: {connectedAddress}</p>
				</div>
			)}
		</div>
	);
}

export default AccountDetailsView;
