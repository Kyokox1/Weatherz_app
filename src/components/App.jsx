/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { Flex, Stack, Button } from "@chakra-ui/react";
import dayjs from "dayjs";

import { getWeather } from "../services/getWeather";

import { Aside } from "./sections/Aside/Aside";
import { WeatherCards } from "./sections/WeatherCards/WeatherCards";
import { WeatherElements } from "./sections/WeatherElements/WeatherElements";

function App() {
	const [weather, setWeather] = useState({});

	const [isCelsius, setIsCelsius] = useState(true);
	const [city, setCity] = useState({ city: "cochabamba" });

	useEffect(() => {
		getWeather({ city: city.city, lat: city.lat, long: city.long }).then(
			(data) => {
				setWeather(data);
			}
		);
	}, [city]);

	// console.log(weather);
	const { current, forecast, location } = weather;

	if (!current || !forecast || !location) return;
	const {
		temp_c,
		temp_f,
		condition,
		humidity,
		vis_km,
		wind_kph,
		pressure_mb,
		wind_dir
	} = current;

	const { name, country } = location;

	const { forecastday } = forecast;

	// ? Function Format for Date

	const FormatDate = (date, format = "ddd, DD MMM") => {
		const dateForecast = dayjs(date).format(format);
		return dateForecast;
	};

	return (
		<Flex direction="row" h="100vh" color="brand.100">
			{/* Aside */}
			<Aside
				FormatDate={FormatDate}
				setCity={setCity}
				name={name}
				country={country}
				temp_c={temp_c}
				temp_f={temp_f}
				condition={condition}
				isCelsius={isCelsius}
			/>
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
					{/* TODO cambiar de Button a Box */}
					{["°C", "°F"].map((unit, i) => (
						<Button
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
						</Button>
					))}
				</Stack>
				{/* Weather Cards */}
				<WeatherCards
					isCelsius={isCelsius}
					FormatDate={FormatDate}
					forecastday={forecastday}
				/>
				{/* Weather elements */}
				<WeatherElements
					humidity={humidity}
					vis_km={vis_km}
					wind_kph={wind_kph}
					pressure_mb={pressure_mb}
					wind_dir={wind_dir}
				/>
			</Stack>
		</Flex>
	);
}

export default App;
