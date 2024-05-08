const URL = 'http://localhost:8000/api/students';

const fetchApi = {
	simplePOST: async (endpoint, data) => {
		const response = await fetch(`${URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		return response.json();
	},
	tokenPOST: async (endpoint, data, token) => {
		const response = await fetch(`${URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		return response.json();
	},
	simpleGET: async (endpoint, token, id = '') => {
		const response = await fetch(`${URL}/${endpoint}/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		});

		return response.json();
	},
};

export { fetchApi };
