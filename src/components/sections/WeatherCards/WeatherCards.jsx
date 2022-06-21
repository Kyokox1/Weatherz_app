import React from "react";
import { Flex } from "@chakra-ui/react";

import { WeatherCardItem } from "./WeatherCardItem.jsx/WeatherCardItem";

export const WeatherCards = ({ isCelsius, FormatDate, forecastday }) => {
	return (
		<Flex
			direction={{ base: "column", lg: "row" }}
			gap={{ base: 8, lg: 5 }}
			justify="space-between"
			align="center"
		>
			{/* WeatherCardItem */}
			{forecastday.map((forecast) => (
				<WeatherCardItem
					key={forecast.date_epoch}
					isCelsius={isCelsius}
					FormatDate={FormatDate}
					forecast={forecast}
				/>
			))}
		</Flex>
	);
};
