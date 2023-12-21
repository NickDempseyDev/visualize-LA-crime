/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,jsx,mdx}', './components/**/*.{js,jsx,mdx}', './app/**/*.{js,jsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			gridTemplateRows: {
				7: 'repeat(7, minmax(0, 1fr))',
				8: 'repeat(8, minmax(0, 1fr))',
				9: 'repeat(9, minmax(0, 1fr))',
				10: 'repeat(10, minmax(0, 1fr))',
				11: 'repeat(11, minmax(0, 1fr))',
			},
			gridTemplateColumns: {
				7: 'repeat(7, minmax(0, 1fr))',
				8: 'repeat(8, minmax(0, 1fr))',
				9: 'repeat(9, minmax(0, 1fr))',
				10: 'repeat(10, minmax(0, 1fr))',
				11: 'repeat(11, minmax(0, 1fr))',
			},
			gridColumnStart: {
				'7-auto': '7 auto',
				'8-auto': '8 auto',
				'9-auto': '9 auto',
				'10-auto': '10 auto',
				'11-auto': '11 auto',
			},
			gridRowStart: {
				'7-auto': '7 auto',
				'8-auto': '8 auto',
				'9-auto': '9 auto',
				'10-auto': '10 auto',
				'11-auto': '11 auto',
			},
		},
	},
	plugins: [],
};
