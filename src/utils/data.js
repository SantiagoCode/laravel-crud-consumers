const URL = 'http://localhost:8000/api/students';
import Cookies from 'js-cookie';

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
	tokenPOST: async (endpoint = '', data) => {
		const response = await fetch(`${URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify(data),
		});

		return response.json();
	},
	simpleGET: async (endpoint = '', id = '') => {
		const response = await fetch(`${URL}/${endpoint}/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
				Accept: 'application/json',
			},
		});

		return response.json();
	},
	simpleDELETE: async (id) => {
		const response = await fetch(`${URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
		});

		return response.json();
	},
};

export { fetchApi };
