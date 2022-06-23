import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	FormControl,
	IconButton,
	Input,
	ListItem,
	Stack,
	UnorderedList
} from "@chakra-ui/react";
import debounce from "just-debounce-it";

import { MdClose } from "react-icons/md";
import { getAutocomplete } from "../../../../services/getAutocomplete";
import { WeatherContext } from "../../../../context/Context";

export const SearchBar = ({ setCity }) => {
	const [city2, setCity2] = useState(undefined);
	const [places, setPlaces] = useState([]);
	const { showSearchBar, setShowSearchBar } = useContext(WeatherContext);

	useEffect(() => {
		getAutocomplete({ city: city2 }).then(setPlaces);
	}, [city2]);

	// ? Search City
	const searhCity = (e) => {
		e.preventDefault();

		const city = e.target.search.value;

		setCity({ city });
		setShowSearchBar(false);
		e.target.search.value = "";
	};

	// ? search para onCLick en LiItem

	const searchPlace = (lat, long) => {
		const coords = { lat, long };

		setCity(coords);
		setShowSearchBar(false);
	};

	// ? Debounce Search
	const handleChange = (e) => {
		const value = e.target.value;
		if (value.length > 2) setCity2(value);
	};

	const debounceChange = debounce(handleChange, 700);

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
					w={{ base: "70%", md: "80%", lg: "65%", xl: "70%" }}
					placeholder="Search Location"
					_focus={{ borderBlockColor: "white" }}
				/>
				<Button type="submit" colorScheme="blue">
					Search
				</Button>
			</FormControl>
			<UnorderedList listStyleType="none" spacing={2} overflowY="auto">
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
	);
};
