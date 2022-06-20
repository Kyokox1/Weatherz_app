/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	IconButton,
	Image,
	Input,
	ListItem,
	Stack,
	Text,
	UnorderedList
} from "@chakra-ui/react";
import { MdGpsFixed, MdGpsNotFixed, MdClose } from "react-icons/md";
import debounce from "just-debounce-it";

import { getAutocomplete } from "../../../services/getAutocomplete";

export const Aside = ({
	FormatDate,
	setCity,
	name,
	country,
	isCelsius,
	temp_c,
	temp_f,
	condition
}) => {
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [city2, setCity2] = useState(undefined);
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		getAutocomplete({ city: city2 }).then(setPlaces);
	}, [city2]);

	// ?Aside Date
	const Today = FormatDate(new Date().toDateString(), "dddd");

	// ? Search City
	const searhCity = (e) => {
		e.preventDefault();

		const city = e.target.search.value;

		setCity({ city });
		setShowSearchBar(false);
		e.target.search.value = "";
	};

	// ? Debounce Search
	const handleChange = (e) => {
		const value = e.target.value;
		if (value.length > 2) setCity2(value);
	};

	const debounceChange = debounce(handleChange, 700);

	// ? search para onCLick en LiItem

	const searchPlace = (lat, long) => {
		const coords = { lat, long };

		setCity(coords);
		setShowSearchBar(false);
	};

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

	return (
		<Flex
			direction="column"
			as="aside"
			pos="relative"
			w="30%"
			maxW={{ lg: "30%", xl: "25%" }}
			bgColor="brand.500"
			textAlign="center"
		>
			{/* SearchBar */}
			<Stack
				pos="absolute"
				top="0"
				bottom="0"
				right="0"
				left="0"
				pt={4}
				px={6}
				bgColor="brand.500"
				filter="auto"
				opacity={showSearchBar ? 1 : 0}
				visibility={showSearchBar ? "visible" : "hidden"}
				transition="all .3s ease-out"
				zIndex="100"
				spacing={8}
			>
				<IconButton
					icon={<MdClose />}
					onClick={() => setShowSearchBar(false)}
					fontSize="3xl"
					alignSelf="end"
					variant="ghost"
				/>
				<FormControl
					as="form"
					onSubmit={searhCity}
					display="flex"
					justifyContent="space-between"
				>
					<Input
						id="search"
						onChange={debounceChange}
						w={{ md: "60%", lg: "65%", xl: "70%" }}
						placeholder="Search Location"
						_focus={{ borderBlockColor: "white" }}
					/>
					<Button type="submit" colorScheme="blue">
						Search
					</Button>
				</FormControl>
				<UnorderedList
					listStyleType="none"
					spacing={2}
					overflowY="auto"
				>
					{" "}
					{places.length === 0 ? (
						<span>Loading...</span>
					) : (
						places.map((city, i) => (
							<ListItem
								key={i}
								onClick={() => searchPlace(city.lat, city.lon)}
								py={4}
								border="1px solid transparent"
								_hover={{ border: "1px #616475 solid" }}
								cursor="pointer"
							>
								{city.name}, {city.region}, {city.country}
							</ListItem>
						))
					)}
				</UnorderedList>
			</Stack>
			{/* /SearchBar */}
			<Flex justify="space-between" p={6}>
				<Button
					colorScheme="whiteAlpha"
					fontSize="sm"
					fontWeight="500"
					color="brand.100"
					onClick={() => setShowSearchBar((prevState) => !prevState)}
				>
					Search for placesasdasdasd
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
					<Image src="/assets/images/LightRain.png" m="0 auto" />
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
