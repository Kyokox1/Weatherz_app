import { Stack } from "@chakra-ui/react";
import React from "react";
import { TempButtonItem } from "./TempButtonItem/TempButtonItem";

export const TempButtonsContainer = () => {
	return (
		<Stack
			display={{ base: "none", lg: "flex" }}
			direction="row"
			as="header"
			justify="end"
		>
			{/* TODO cambiar de Button a Box */}
			{["°C", "°F"].map((unit, i) => (
				<TempButtonItem key={i} unit={unit} i={i} />
			))}
		</Stack>
	);
};
