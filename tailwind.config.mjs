import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Rubik Variable", ...fontFamily.sans],
			},
			animation: {
				shine: "shine 1.5s cubic-bezier(.42,0,.58,1) forwards",
			},
			keyframes: {
				shine: {
					from: {
						"background-position": `50% 50%`,
					},
					to: {
						"background-position": `-50% -50%`,
					},
				},
			},
		},
	},
	plugins: [],
};
