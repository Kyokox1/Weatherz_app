import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

export const WeatherCardItem = ({ forecast, FormatDate, isCelsius }) => {
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
			<Text>{FormatDate(forecast.date)}</Text>
			<Image
				src="/assets/images/HeavyCloud.png"
				boxSize={{ base: "70px", lg: "60px", xl: "80px" }}
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
