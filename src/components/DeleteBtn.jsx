import React from 'react';
import { fetchApi } from '../utils/data';

const DeleteBtn = ({ id, list, setList }) => {
	const handleDelete = () => {
		fetchApi
			.simpleDELETE(id)
			.then((response) => {
				try {
					if (response.error) throw new Error(response.error);

					setList(list.filter((item) => item.id !== id));

					alert('Successfully deleted.');
				} catch (error) {
					console.error(error);
					alert('Error: ' + error.message || 'An error occurred. Please try again.');
				}
			})
			.catch((error) => {
				console.error(error);
				alert('Error: ' + error.message || 'An error occurred. Please try again.');
			});
	};

	return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteBtn;
