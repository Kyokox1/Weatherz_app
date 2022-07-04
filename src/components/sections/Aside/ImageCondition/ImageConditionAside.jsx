import { Box, Image } from "@chakra-ui/react";
import React from "react";

export const ImageConditionAside = ({ imageWeather }) => {
	return (
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
			/>
			<Image src={imageWeather} m="0 auto" alt="Weather" />
		</Box>
	);
};
