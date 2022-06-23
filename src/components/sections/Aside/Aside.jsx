/* eslint-disable camelcase */
import React, { useContext } from "react";
import { Flex, Spinner, Stack } from "@chakra-ui/react";

import { WeatherContext } from "../../../context/Context";
import { SearchBar } from "./SearchBar/SearchBar";
import { HeaderButtonsAside } from "./HeaderButtons/HeaderButtonsAside";
import { ImageConditionAside } from "./ImageCondition/ImageConditionAside";
import { FooterAside } from "./FooterInformation/FooterAside";

export const Aside = ({
	setCity,
	name,
	country,
	temp_c,
	temp_f,
	condition,
	loading
}) => {
	const { isCelsius, iconWeather } = useContext(WeatherContext);

	const imageWeather = iconWeather(condition.text);

	return (
		<Flex
			direction="column"
			as="aside"
			pos="relative"
			h="100vh"
			w={{ base: "100%", lg: "30%" }}
			maxW={{ lg: "30%", xl: "25%" }}
			bgColor="brand.500"
			textAlign="center"
			pb={{ base: "20px", lg: "0" }}
		>
			{/* SearchBar */}
			<SearchBar setCity={setCity} />
			{/* /SearchBar */}
			{loading ? (
				<Flex h="100%" w="100%" justify="center" align="center">
					<Spinner color="blue" size="xl" />
				</Flex>
			) : (
				<>
					<HeaderButtonsAside setCity={setCity} />

					<Stack flex="1" justify="space-around" color="brand.200">
						<ImageConditionAside imageWeather={imageWeather} />

						<FooterAside
							isCelsius={isCelsius}
							name={name}
							country={country}
							temp_c={temp_c}
							temp_f={temp_f}
							condition={condition}
						/>
					</Stack>
				</>
			)}
		</Flex>
	);
};
