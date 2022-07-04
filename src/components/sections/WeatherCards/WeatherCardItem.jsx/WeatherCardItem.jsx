import React, { useContext } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { WeatherContext } from "../../../../context/Context";

export const WeatherCardItem = ({ forecast }) => {
	const { isCelsius, iconWeather, formatDate } = useContext(WeatherContext);

	const imageWeather = iconWeather(forecast.day.condition.text);

	return (
		<Flex
			direction="column"
			bgColor="brand.500"
			flex="1"
			py={2}
			alignItems="center"
			fontSize="sm"
			minW={{ base: "85%", md: "60%", lg: "auto" }}
		>
			<Text>{formatDate(forecast.date)}</Text>
			<Image
				src={imageWeather}
				boxSize={{ base: "70px", lg: "60px", xl: "80px" }}
				alt="WeatherCondition"
			/>
			<Flex justify="space-evenly" w="100%" pt={3}>
				<Text>
					{isCelsius
						? `${forecast.day.maxtemp_c} °C`
						: `${forecast.day.maxtemp_f}  °F`}
				</Text>
				<Text color="brand.200">
					{isCelsius
						? `${forecast.day.mintemp_c} °C`
						: `${forecast.day.mintemp_f} °F`}
				</Text>{" "}
			</Flex>
		</Flex>
	);
};
