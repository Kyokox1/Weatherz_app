/* eslint-disable camelcase */
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const FooterAside = ({
	isCelsius,
	FormatDate,
	temp_c,
	temp_f,
	condition,
	country,
	name
}) => {
	// ?Aside Date
	const Today = FormatDate(new Date().toDateString(), "dddd");
	return (
		<>
			<Heading
				as="h3"
				display="flex"
				alignItems="center"
				justifyContent="center"
				color="brand.100"
				fontSize="8xl"
				fontWeight="500"
			>
				{isCelsius ? temp_c : temp_f}
				<Box
					display="inline-block"
					as="span"
					fontWeight="400"
					fontSize="3xl"
					color="brand.200"
					ml="5px"
					mb="-10%"
				>
					{isCelsius ? "°C" : "°F"}
				</Box>
			</Heading>
			<Text fontWeight="600" fontSize="2xl">
				{condition.text}
			</Text>
			<Stack fontSize="sm">
				<Text>Today - {Today}</Text>
				<Box padding={2} fontSize="sm" fontWeight="600">
					{name} - {country}
				</Box>
			</Stack>
		</>
	);
};
