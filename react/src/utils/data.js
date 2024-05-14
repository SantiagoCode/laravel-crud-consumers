const URL = 'http://localhost:8000/api/students';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

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
		toast.error(statusMessages[response.status], {
			position: 'bottom-right',
			autoClose: 1,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: 1,
		});
		if (response.status === 401 && !window.location.pathname.endsWith('/login')) {
			setTimeout(() => (window.location.href = '/login')), 1000;
		}
	} else if (!response.ok) {
		toast.error('Error desconocido. Por favor, inténtelo de nuevo mas tarde.', {
			position: 'bottom-right',
			autoClose: 1,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: 1,
		});
	}
};

export { fetchApi };
