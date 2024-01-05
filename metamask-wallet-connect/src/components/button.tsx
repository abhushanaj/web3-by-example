import type { ComponentProps } from 'react';

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

export default Button;
