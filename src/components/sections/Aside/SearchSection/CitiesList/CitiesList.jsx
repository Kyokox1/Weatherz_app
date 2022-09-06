import { Flex, ListItem, Spinner, UnorderedList } from "@chakra-ui/react";
import React from "react";

export const CitiesList = ({
	isLoading,
	places,
	setCity,
	setShowSearchBar
}) => {
	// ? search para onCLick en LiItem

	const searchPlace = (lat, long) => {
		const coords = { lat, long };

		setCity(coords);
		setShowSearchBar(false);
	};
	return (
		<UnorderedList
			flex="1"
			listStyleType="none"
			spacing={2}
			overflowY="auto"
		>
			{" "}
			{isLoading ? (
				<Flex
					h="100%"
					justify="center"
					align="center"
					bgColor="brand.500"
				>
					<Spinner color="blue" size="xl" />
				</Flex>
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
			{places.length === 0 && <span>No Results :c</span>}
		</UnorderedList>
	);
};
