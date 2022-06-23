import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme/theme";

import App from "./components/App";
import { WeatherProvider } from "./context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<WeatherProvider>
				<App />
			</WeatherProvider>
		</ChakraProvider>
	</React.StrictMode>
);
