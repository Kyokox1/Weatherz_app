import { Stack } from "@chakra-ui/react";
import React from "react";
import { TempButtonItem } from "./TempButtonItem/TempButtonItem";

export const TempButtonsContainer = ({ isCelsius, setIsCelsius }) => {
	return (
		<Stack
			display={{ base: "none", lg: "flex" }}
			direction="row"
			as="header"
			justify="end"
		>
			{/* TODO cambiar de Button a Box */}
			{["°C", "°F"].map((unit, i) => (
				<TempButtonItem
					key={i}
					unit={unit}
					i={i}
					isCelsius={isCelsius}
					setIsCelsius={setIsCelsius}
				/>
			))}
		</Stack>
	);
};
