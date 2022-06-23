import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

import { WeatherContext } from "../../../../context/Context";

export const TempButtonItem = ({ i, unit }) => {
	const { isCelsius, setIsCelsius } = useContext(WeatherContext);

	return (
		<Box
			as="button"
			onClick={() =>
				isCelsius
					? i === 1 && setIsCelsius(false)
					: i === 0 && setIsCelsius(true)
			}
			borderRadius="50%"
			fontWeight="700"
			bgColor={
				isCelsius
					? i === 0
						? "brand.100"
						: "brand.400"
					: i === 1
					? "brand.100"
					: "brand.400"
			}
			color={
				isCelsius
					? i === 0
						? "brand.600"
						: "brand.100"
					: i === 1
					? "brand.600"
					: "brand.100"
			}
			boxSize={10}
			_hover={
				isCelsius
					? i === 1 && {
							bgColor: "brand.500"
					  }
					: i === 0 && {
							bgColor: "brand.500"
					  }
			}
		>
			{unit}
		</Box>
	);
};
