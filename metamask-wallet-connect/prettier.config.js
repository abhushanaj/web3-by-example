/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-tailwindcss'],

	// General
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	semi: true,
	printWidth: 120,
	trailingComma: 'none',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',

	// jsx specific
	quoteProps: 'as-needed',
	jsxSingleQuote: false,

	// tailwind specific
	tailwindAttributes: ['class:list'],
	tailwindFunctions: ['cn', 'clsx', 'cls']
};
