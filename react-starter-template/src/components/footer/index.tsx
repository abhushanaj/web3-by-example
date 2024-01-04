function Footer() {
	return (
		<footer className="h-[var(--footer-height)] border-t-[1px] border-slate-200 px-[var(--body-space-left)]">
			<div className="mx-auto  flex max-w-[var(--primary-content-width)] justify-between 	pb-4 pt-4">
				<p className="text-sm text-gray-950">Abhushan Adhikari Joshi.</p>

				<div className="flex justify-start gap-3 text-sm">
					<a
						href="http://github.com/abhu-A-J"
						className="text-gray-950 underline decoration-current  underline-offset-2 hover:text-gray-800"
					>
						Github
					</a>
					<a
						href="http://twitter.com/abhushanaj"
						className="text-gray-950 underline decoration-current  underline-offset-2 hover:text-gray-800"
					>
						Twitter
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
