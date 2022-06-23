import React, { createContext, useState } from "react";

export const WeatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
	const [isCelsius, setIsCelsius] = useState(true);

	const iconWeather = (text) => {
		text = text.toLowerCase();
		if (text.includes("thunder")) return "/assets/images/Thunderstorm.png";
		if (text.includes("sunny") || text.includes("clear"))
			return "/assets/images/Clear.png";
		if (text.includes("drizzle")) return "/assets/images/Shower.png";
		if (text.includes("rain")) return "/assets/images/HeavyRain.png";
		if (text.includes("snow")) return "/assets/images/Snow.png";
		if (text.includes("sleet") || text.includes("freezing"))
			return "/assets/images/Sleet.png";
		if (text.includes("blizzard") || text.includes("ice"))
			return "/assets/images/Hail.png";
		if (text.includes("mist")) return "/assets/images/LightCloud.png";

		return "/assets/images/HeavyCloud.png";
	};

	return (
		<WeatherContext.Provider
			value={{ isCelsius, setIsCelsius, iconWeather }}
		>
			{children}
		</WeatherContext.Provider>
	);
};
