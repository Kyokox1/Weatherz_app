const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
		"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
	}
};

export const getWeather = async ({ lat, long, city = "potosi" }) => {
	try {
		if ((lat, long)) {
			const response = await fetch(
				`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`,
				options
			);
			const data = await response.json();
			// console.log(data);
			return data;
		}
		const response = await fetch(
			`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`,
			options
		);
		const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
