/* eslint-disable camelcase */
import React from "react";
import { Grid, Heading, Stack } from "@chakra-ui/react";

import { WeatherElementCard } from "./WeatherElementCard/WeatherElementCard";

export const WeatherElements = ({
	wind_kph,
	wind_dir,
	humidity,
	vis_km,
	pressure_mb
}) => {
	// ? WeatherCards
	const weatherParameters = [
		{ name: "Wind status", value: wind_kph, unit: "km/h" },
		{ name: "Humidity", value: humidity, unit: "%" },
		{ name: "Visibility", value: vis_km, unit: "km" },
		{ name: "Air Pressure", value: pressure_mb, unit: "mb" }
	];

	return (
		<Stack pb={{ base: 20, lg: 0 }}>
			<Heading
				as="h1"
				fontSize="2xl"
				py={2}
				pt={{ base: 10, lg: 2 }}
				textAlign={{ base: "center", lg: "initial" }}
			>
				{`Today's Highlights`}
			</Heading>
			<Grid
				gridTemplateColumns={{
					base: "1fr",
					md: "repeat(2,1fr)"
				}}
				gap={{ base: 7, lg: 4, xl: 6, "2xl": 12 }}
			>
				{/* WeatherCards */}
				{weatherParameters.map((parameter, i) => (
					<WeatherElementCard
						key={i}
						name={parameter.name}
						value={parameter.value}
						unit={parameter.unit}
						wind_dir={wind_dir}
						i={i}
					/>
				))}
			</Grid>
		</Stack>
	);
};
