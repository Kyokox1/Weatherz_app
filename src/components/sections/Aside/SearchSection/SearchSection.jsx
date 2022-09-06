import React, { useContext, useEffect, useState } from "react";
import { IconButton, Stack } from "@chakra-ui/react";

import { MdClose } from "react-icons/md";
import { getAutocomplete } from "../../../../services/getAutocomplete";
import { WeatherContext } from "../../../../context/Context";
import { FormSearchBar } from "./FormSearchBar/FormSearchBar";
import { CitiesList } from "./CitiesList/CitiesList";

export const SearchSection = ({ setCity }) => {
	const [city2, setCity2] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [places, setPlaces] = useState([]);
	const { showSearchBar, setShowSearchBar } = useContext(WeatherContext);

	useEffect(() => {
		setIsLoading(true);
		getAutocomplete({ city: city2 }).then((data) => {
			setPlaces(data);
			setIsLoading(false);
		});
	}, [city2]);

	return (
		<Stack
			pos="absolute"
			top="0"
			bottom="0"
			right="0"
			left="0"
			pt={4}
			px={{ base: 3, md: 20, lg: 6 }}
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
				color="brand.100"
				aria-label="close"
				bgColor="transparent"
				_hover={{
					bgColor: "brand.400"
				}}
			/>
			<FormSearchBar
				setCity={setCity}
				setShowSearchBar={setShowSearchBar}
				setCity2={setCity2}
			/>

			<CitiesList
				isLoading={isLoading}
				places={places}
				setCity={setCity}
				setShowSearchBar={setShowSearchBar}
			/>
		</Stack>
	);
};
