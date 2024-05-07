const URL = 'http://localhost:8000/api/students';

const fetchApi = {
	simplePOST: async (data, endpoint) => {
		const response = await fetch(`${URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		return response.json();
	},
};

export { fetchApi };
