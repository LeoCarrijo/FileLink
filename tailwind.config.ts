import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontSize: {
			sm: "0.8rem",
			base: "1rem",
			xl: "1.25rem",
			"2xl": "1.563rem",
			"3xl": "1.953rem",
			"4xl": "2.441rem",
			"5xl": "3.052rem",
		},
		extend: {
			gridTemplateColumns: {
				header: "1fr 2fr 1fr",
			},
			gridTemplateRows: {
				body: "1fr 3fr 1fr",
			},
			gridColumn: {
				logo: "1 / 2",
				titulo: "2 / 3",
				avatar: "3 / 4",
				header: "1 / 2",
				main: "1 / 2",
				footer: "1 / 2",
			},
			gridRow: {
				logo: "1 / 2",
				titulo: "1 / 2",
				avatar: "1 / 2",
				header: "1 / 2",
				main: "2 / 3",
				footer: "3 / 4",
			},
			padding: {
				"p-tema": "padding: 0 0 1.25rem 1.25rem",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
