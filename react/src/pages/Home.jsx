import React, { useEffect, useState } from 'react';
import { fetchApi } from '../utils/data';
import Global_Layout from '../components/Global_Layout';
import UserTable from '../components/UserTable';
import Cookies from 'js-cookie';
import './../assets/modules/table.module.css';

const Home = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [edit, setEdit] = useState(null);
	const userCookies = Cookies.get('user');
	const user = JSON.parse(userCookies);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchApi.GET();

				if (!response) throw new Error('No response received');
				if (response.error) throw new Error(response.error);

				setStudents(response);
				setLoading(false);
			} catch (error) {
				console.error(error);
				alert('Error: ' + error.message || 'An error occurred. Please try again.');
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<Global_Layout>
			<h1>Hello, {user.name}</h1>
			{loading ? <h3>Loading...</h3> : <UserTable students={students} setStudents={setStudents} edit={edit} setEdit={setEdit} />}
		</Global_Layout>
	);
};

export default Home;
