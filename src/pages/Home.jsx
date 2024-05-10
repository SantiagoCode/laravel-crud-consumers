import React, { useEffect, useState } from 'react';
import { fetchApi } from '../utils/data';
import Global_Layout from '../components/Global_Layout';
import UserTable from '../components/UserTable';
import Cookies from 'js-cookie';
import ContentLoader from 'react-content-loader';
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
			{true ? <TableSkeleton /> : <UserTable students={students} setStudents={setStudents} edit={edit} setEdit={setEdit} />}
		</Global_Layout>
	);
};

export default Home;

const TableSkeleton = (props) => (
	<ContentLoader speed={2} width={720} height={300} viewBox='0 0 720 300' backgroundColor='#f3f3f3' foregroundColor='#ecebeb' {...props}>
		<circle cx='24' cy='24' r='20' />
		<rect x='61' y='11' rx='5' ry='5' width='546' height='25' />
		<circle cx='24' cy='98' r='20' />
		<rect x='61' y='86' rx='5' ry='5' width='546' height='25' />
		<circle cx='24' cy='172' r='20' />
		<rect x='61' y='160' rx='5' ry='5' width='546' height='25' />
		<circle cx='24' cy='247' r='20' />
		<rect x='61' y='234' rx='5' ry='5' width='546' height='25' />
	</ContentLoader>
);

TableSkeleton.metadata = {
	name: 'Sridhar Easwaran',
	github: 'sridhareaswaran',
	description: 'Dashboard pages',
	filename: 'TableSkeleton',
};
