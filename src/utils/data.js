const URL = 'http://localhost:8000/api/students';
import Cookies from 'js-cookie';

const fetchApi = {
	request: async (method, endpoint = '', id = '', data = null) => {
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		try {
			const response = await fetch(`${URL}${endpoint ? '/' + endpoint : ''}${id ? '/' + id : ''}`, options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('There was a problem with the fetch operation: ', error);
		}
	},
	simplePOST: function (endpoint, data) {
		return this.request('POST', endpoint, '', data);
	},
	GET: function () {
		return this.request('GET');
	},
	simpleGET: function (id) {
		return this.request('GET', '', id);
	},
	PATCH: function (id, data) {
		return this.request('PATCH', '', id, data);
	},
	simpleDELETE: function (id) {
		return this.request('DELETE', '', id);
	},
};

export { fetchApi };
