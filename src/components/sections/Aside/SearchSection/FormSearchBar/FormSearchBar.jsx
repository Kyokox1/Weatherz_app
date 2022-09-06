import { Button, FormControl, Input } from "@chakra-ui/react";
import debounce from "just-debounce-it";
import React from "react";

export const FormSearchBar = ({ setCity, setShowSearchBar, setCity2 }) => {
	// ? Search City
	const searchCity = (e) => {
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

	return (
		<FormControl
			as="form"
			onSubmit={searchCity}
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
	);
};
