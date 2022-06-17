import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	colors: {
		brand: {
			100: "#E7E7EB",
			200: "#A09FB1",
			300: "#88869D",
			400: "#585676",
			500: "#1E213A",
			600: "#100E1D"
		}
	},
	fonts: {
		heading: `'Raleway', sans-serif`,
		body: `'Raleway', sans-serif`
	},
	breakpoints: {
		sm: "320px",
		md: "768px",
		lg: "960px",
		xl: "1200px",
		"2xl": "1536px"
	}
});
