const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
		"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
	}
};

export const getAutocomplete = async ({ city = "potosi" }) => {
	try {
		const response = await fetch(
			`https://weatherapi-com.p.rapidapi.com/search.json?q=${city}`,
			options
		);
		const data = await response.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
