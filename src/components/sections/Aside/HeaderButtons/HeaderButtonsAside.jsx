import { Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";

import { MdGpsFixed, MdGpsNotFixed } from "react-icons/md";

export const HeaderButtonsAside = ({ setShowSearchBar, setCity }) => {
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
	);
};
