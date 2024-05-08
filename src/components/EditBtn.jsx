import React from 'react';
import { fetchApi } from '../utils/data';

const EditBtn = ({ id, edit, setEdit, setList }) => {
	const handleEdit = () => {
		try {
			const name = document.querySelector(`td[data-user="${id}"] input[name="name"]`).value;
			const email = document.querySelector(`td[data-user="${id}"] input[name="email"]`).value;
			const phone = document.querySelector(`td[data-user="${id}"] input[name="phone"]`).value;
			const address = document.querySelector(`td[data-user="${id}"] input[name="address"]`).value;

			fetchApi
				.PATCH(id, { name, email, phone, address })
				.then((response) => {
					if (response.error) throw new Error(response.error);
					alert('Successfully updated.');
				})
				.then(() => {
					setList((prevList) => {
						return prevList.map((item) => {
							if (item.id === id) {
								return { ...item, name, email, phone, address };
							}

							return item;
						});
					});
				})
				.catch((error) => {
					console.error(error);
					alert('Error: ' + error.message || 'An error occurred. Please try again.');
				});

			setEdit(0);
		} catch (error) {
			console.error(error);
			alert('Error: ' + error.message || 'An error occurred. Please try again.');
		}
	};

	return (
		<button
			onClick={() => {
				!edit || id !== edit ? setEdit(id) : handleEdit();
			}}>
			{!edit || id !== edit ? 'Edit' : 'Save'}
		</button>
	);
};

export default EditBtn;
