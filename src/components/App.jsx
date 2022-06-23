/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import { Flex, Spinner, Stack } from "@chakra-ui/react";

import { getWeather } from "../services/getWeather";

import { Aside } from "./sections/Aside/Aside";
import { WeatherCards } from "./sections/WeatherCards/WeatherCards";
import { WeatherElements } from "./sections/WeatherElements/WeatherElements";
import { TempButtonsContainer } from "./sections/TemperatureButtons/TempButtonsContainer";
import { WeatherContext } from "../context/Context";

function App() {
	const [weather, setWeather] = useState({});
	const [city, setCity] = useState({ city: "cochabamba" });
	const [loading, setLoading] = useState(false);
	const { showSearchBar } = useContext(WeatherContext);

	useEffect(() => {
		setLoading(true);
		getWeather({ city: city.city, lat: city.lat, long: city.long }).then(
			(data) => {
				setWeather(data);
				setLoading(false);
			}
		);
	}, [city]);

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

	return (
		<Flex
			direction={{ base: "column", lg: "row" }}
			h={{ base: "auto", lg: "100vh" }}
			color="brand.100"
		>
			{/* Aside */}

			<Aside
				setCity={setCity}
				name={name}
				country={country}
				temp_c={temp_c}
				temp_f={temp_f}
				condition={condition}
				loading={loading}
			/>
			{/* Main */}
			{loading ? (
				<Flex
					display={{ base: "none", lg: "flex" }}
					flex="1"
					justify="center"
					align="center"
				>
					<Spinner color="blue" size="xl" />
				</Flex>
			) : (
				<Stack
					display={showSearchBar && { base: "none", lg: "flex" }}
					direction={"column"}
					as="main"
					flex="1"
					bgColor="brand.600"
					pt={6}
					px="5%"
				>
					{/* Farenheit Celsius Buttons */}
					<TempButtonsContainer />
					{/* Weather Cards */}
					<WeatherCards forecastday={forecastday} />
					{/* Weather elements */}
					<WeatherElements
						humidity={humidity}
						vis_km={vis_km}
						wind_kph={wind_kph}
						pressure_mb={pressure_mb}
						wind_dir={wind_dir}
					/>
				</Stack>
			)}
		</Flex>
	);
}

export default App;
