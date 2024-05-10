import React from 'react';
import { fetchApi } from '../utils/data';

const DeleteBtn = ({ id, list, setList }) => {
	const handleDelete = async () => {
		try {
			const response = await fetchApi.simpleDELETE(id);

			if (!response) throw new Error('No response received');
			if (response.error) throw new Error(response.error);

			setList(list.filter((item) => item.id !== id));

			alert('Successfully deleted.');
		} catch (error) {
			console.error(error);
			alert('Error: ' + error.message || 'An error occurred. Please try again.');
		}
	};

	return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteBtn;
