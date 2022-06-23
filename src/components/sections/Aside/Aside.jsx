/* eslint-disable camelcase */
import React, { useContext, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	Text
} from "@chakra-ui/react";
import { MdGpsFixed, MdGpsNotFixed } from "react-icons/md";

import { SearchBar } from "./SearchBar/SearchBar";
import { WeatherContext } from "../../../context/Context";

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

	// ?Aside Date
	const Today = FormatDate(new Date().toDateString(), "dddd");

	// ? Geolocalization

	const ubicationUser = () => {
		const options = {
			enableHighAccuracy: true,
			timeout: 6000,
			maximumAge: 0
		};

		const success = ({ coords }) => {
			setCity({ lat: coords.latitude, long: coords.longitude });
		};

		const error = (err) => {
			console.log(err);
		};

		// useEffect(() => {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition(success, error, options);
		// }, []);
	};

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
			<Flex justify="space-between" p={6}>
				<Button
					colorScheme="whiteAlpha"
					fontSize="sm"
					fontWeight="500"
					color="brand.100"
					onClick={() => setShowSearchBar((prevState) => !prevState)}
				>
					Search for places
				</Button>
				<IconButton
					onClick={ubicationUser}
					color="brand.100"
					icon={<MdGpsFixed />}
					colorScheme="whiteAlpha"
					isRound="true"
					fontSize="xl"
				/>
			</Flex>
			<Stack flex="1" justify="space-around" color="brand.200">
				<Box pos="relative">
					<Box
						pos="absolute"
						top="0%"
						bottom="0"
						right="0%"
						left="0"
						bgImg="/assets/images/Cloud-background.png"
						bgRepeat="no-repeat"
						bgPos="center"
						bgSize="cover"
						filter="auto"
						opacity="10%"
					></Box>
					<Image src={imageWeather} m="0 auto" />
				</Box>
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
			</Stack>
		</Flex>
	);
};
