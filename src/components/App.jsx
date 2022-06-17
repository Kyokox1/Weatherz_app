/* eslint-disable camelcase */
import {
	Container,
	Flex,
	Stack,
	Button,
	IconButton,
	Image,
	Box,
	Text,
	Heading,
	Grid,
	GridItem,
	FormControl,
	Input,
	UnorderedList,
	ListItem,
	VStack
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { MdGpsFixed, MdGpsNotFixed, MdClose } from "react-icons/md";

import { getWeather } from "../services/getWeather";

function App() {
	const [weather, setWeather] = useState({});
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [isCelsius, setIsCelsius] = useState(true);

	useEffect(() => {
		getWeather({ city: "potosi" }).then((data) => {
			setWeather(data);
		});
	}, []);

	const { current, forecast, location } = weather;

	if (!current || !forecast || !location) return;
	const {
		temp_c,
		temp_f,
		condition,
		humidity,
		vis_km,
		wind_kph,
		pressure_mb
	} = current;

	const { name, region, country } = location;

	const { forecastday } = forecast;
	// ? WeatherCargs
	const weatherParameters = [
		{ name: "Wind status", value: wind_kph, unit: "km/h" },
		{ name: "Humidity", value: humidity, unit: "%" },
		{ name: "Visibility", value: vis_km, unit: "km" },
		{ name: "Air Pressure", value: pressure_mb, unit: "mb" }
	];
	console.log(forecast);

	const FormatDate = (date, format = "ddd, DD MMM") => {
		const dateForecast = dayjs(date).format(format);
		return dateForecast;
	};
	// ?Aside Date
	const Today = FormatDate(new Date().toDateString(), "dddd");

	return (
		<Flex direction="row" h="100vh" color="brand.100">
			{/* Aside */}
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
					<FormControl display="flex" justifyContent="space-between">
						<Input
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
						<ListItem
							py={4}
							border="1px solid transparent"
							_hover={{ border: "1px #616475 solid" }}
							cursor="pointer"
						>
							London
						</ListItem>
						<ListItem
							py={4}
							border="1px solid transparent"
							_hover={{ border: "1px #616475 solid" }}
							cursor="pointer"
						>
							London
						</ListItem>
						<ListItem
							py={4}
							border="1px solid transparent"
							_hover={{ border: "1px #616475 solid" }}
							cursor="pointer"
						>
							London
						</ListItem>
					</UnorderedList>
				</Stack>
				{/* /SearchBar */}
				<Flex justify="space-between" p={6}>
					<Button
						fontSize="sm"
						onClick={() =>
							setShowSearchBar((prevState) => !prevState)
						}
					>
						Search for places
					</Button>
					<IconButton
						icon={<MdGpsFixed />}
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
						<Image
							src="/public/assets/images/LightRain.png"
							m="0 auto"
						/>
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
			{/* Main */}
			<Stack
				direction={"column"}
				as="main"
				flex="1"
				bgColor="brand.600"
				pt={6}
				px="5%"
			>
				{/* Farenheit Celsius */}
				<Stack direction="row" as="header" justify="end">
					{["°C", "°F"].map((unit, i) => (
						<Box
							key={i}
							as="button"
							onClick={() =>
								isCelsius
									? i === 1 && setIsCelsius(false)
									: i === 0 && setIsCelsius(true)
							}
							borderRadius="50%"
							fontWeight="700"
							bgColor={
								isCelsius
									? i === 0
										? "brand.100"
										: "brand.400"
									: i === 1
									? "brand.100"
									: "brand.400"
							}
							color={
								isCelsius
									? i === 0
										? "brand.600"
										: "brand.100"
									: i === 1
									? "brand.600"
									: "brand.100"
							}
							boxSize={10}
						>
							{unit}
						</Box>
					))}
				</Stack>
				{/* Weather Cards */}
				<Flex direction="row" gap={5} justify="space-between">
					{/* WeatherCardItem */}
					{forecastday.map((forecast, i) => (
						<Flex
							key={forecast.date_epoch}
							direction="column"
							bgColor="brand.500"
							flex="1"
							py={2}
							align="center"
							fontSize="sm"
						>
							<Text>{FormatDate(forecast.date)}</Text>
							<Image
								src="/public/assets/images/HeavyCloud.png"
								h="70px"
								w="70px"
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
					))}
				</Flex>
				{/* Weather elements */}
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
									<Text
										as="span"
										fontSize="2xl"
										fontWeight="500"
									>
										{" "}
										{parameter.unit}
									</Text>
								</Text>
								<Box display={i <= 1 ? "block" : "none"}>
									asdasd
								</Box>
							</GridItem>
						))}
					</Grid>
				</Stack>
			</Stack>
		</Flex>
	);
}

export default App;