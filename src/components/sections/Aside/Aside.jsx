/* eslint-disable camelcase */
import React, { useContext, useState } from "react";
import { Flex, Stack } from "@chakra-ui/react";

import { WeatherContext } from "../../../context/Context";
import { SearchBar } from "./SearchBar/SearchBar";
import { HeaderButtonsAside } from "./HeaderButtons/HeaderButtonsAside";
import { ImageConditionAside } from "./ImageCondition/ImageConditionAside";
import { FooterAside } from "./FooterInformation/FooterAside";

export const Aside = ({
	FormatDate,
	setCity,
	name,
	country,
	temp_c,
	temp_f,
	condition
}) => {
	const [showSearchBar, setShowSearchBar] = useState(false);
	const { isCelsius, iconWeather } = useContext(WeatherContext);

	const imageWeather = iconWeather(condition.text);

	return (
		<Flex
			direction="column"
			as="aside"
			pos="relative"
			w={{ base: "100%", lg: "30%" }}
			maxW={{ lg: "30%", xl: "25%" }}
			bgColor="brand.500"
			textAlign="center"
			pb={{ base: "40px", lg: "0" }}
		>
			{/* SearchBar */}
			<SearchBar
				setCity={setCity}
				setShowSearchBar={setShowSearchBar}
				showSearchBar={showSearchBar}
			/>
			{/* /SearchBar */}
			<HeaderButtonsAside
				setShowSearchBar={setShowSearchBar}
				setCity={setCity}
			/>

			<Stack flex="1" justify="space-around" color="brand.200">
				<ImageConditionAside imageWeather={imageWeather} />

				<FooterAside
					isCelsius={isCelsius}
					FormatDate={FormatDate}
					name={name}
					country={country}
					temp_c={temp_c}
					temp_f={temp_f}
					condition={condition}
				/>
			</Stack>
		</Flex>
	);
};
