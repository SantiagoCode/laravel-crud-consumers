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
				handleErrors(response);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error(error);
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

const handleErrors = (response) => {
	const statusMessages = {
		401: 'Credenciales incorrectas. Por favor verifique e intente de nuevo.',
		404: 'El recurso solicitado no se encontró.',
		500: 'Error interno del servidor. Por favor, inténtelo de nuevo mas tarde.',
	};

	if (statusMessages[response.status]) {
		alert(statusMessages[response.status]);
		if (response.status === 401) {
			window.location.href = '/login';
		}
	} else if (!response.ok) {
		alert('Error desconocido. Por favor, inténtelo de nuevo mas tarde.');
	}
};

export { fetchApi };
