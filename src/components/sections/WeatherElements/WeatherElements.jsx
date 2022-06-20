/* eslint-disable camelcase */
import React from "react";
import {
	Box,
	Grid,
	GridItem,
	Heading,
	Icon,
	Stack,
	Text
} from "@chakra-ui/react";
import { RiCompassDiscoverFill } from "react-icons/ri";

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

	// ? Compass Direction

	const windDirection = (direction) => {
		if (direction.length > 2) {
			direction = direction.split("").slice(1, 3).join("");
		}
		if (direction === "NE") return "0deg";
		if (direction === "E") return "45deg";
		if (direction === "SE") return "90deg";
		if (direction === "S") return "135deg";
		if (direction === "SW") return "180deg";
		if (direction === "W") return "225deg";
		if (direction === "NW") return "270deg";
		if (direction === "N") return "315deg";
	};
	return (
		<Stack>
			<Heading as="h1" fontSize="2xl" py={2}>
				{`Today's Highlights`}
			</Heading>
			<Grid gridTemplateColumns="repeat(2,1fr)" gap={7}>
				{weatherParameters.map((parameter, i) => (
					<GridItem
						key={i}
						display="flex"
						flexDir="column"
						alignItems="center"
						py={3}
						bgColor="brand.500"
					>
						<Text fontSize="sm">{parameter.name}</Text>
						<Text fontSize="5xl" fontWeight="700">
							{parameter.value}{" "}
							<Text as="span" fontSize="2xl" fontWeight="500">
								{" "}
								{parameter.unit}
							</Text>
						</Text>
						{/* Wind direction */}
						<Box
							display={i === 0 ? "flex" : "none"}
							justifyContent="center"
							alignItems="center"
							gap={4}
							fontSize="sm"
							w="100%"
						>
							<Icon
								as={RiCompassDiscoverFill}
								boxSize={8}
								filter="invert(30%)"
								transform={`rotate(${windDirection(wind_dir)})`}
							/>
							<Text>{wind_dir}</Text>
						</Box>
						{/* Humidity porcent bar */}
						<Box
							display={i === 1 ? "flex" : "none"}
							flexDirection="column"
							w="65%"
							fontSize="xs"
							color="brand.200"
						>
							<Stack direction="row" justify="space-between">
								<Text>0</Text>
								<Text>50</Text>
								<Text>100</Text>
							</Stack>
							<Box
								bgColor="brand.100"
								w="100%"
								h="8px"
								borderRadius="50px"
								overflow="hidden"
							>
								<Box
									bgColor="#FFEC65"
									w={`${parameter.value}%`}
									h="inherit"
								/>
							</Box>
							<Text alignSelf="end">%</Text>
						</Box>
					</GridItem>
				))}
			</Grid>
		</Stack>
	);
};
