import React, { useState, useEffect } from 'react';
import Global_Layout from '../components/Global_Layout.jsx';
import { fetchApi } from './../utils/data.js';
import Cookies from 'js-cookie';
import DeleteBtn from '../components/DeleteBtn.jsx';
import './../assets/modules/table.module.css';

const Home = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = Cookies.get('user');

	useEffect(() => {
		fetchApi
			.simpleGET()
			.then((response) => {
				try {
					if (response.error) throw new Error(response.error);

					setStudents(response);
					setLoading(false);
				} catch (error) {
					console.error(error);
					alert('Error: ' + error.message || 'An error occurred. Please try again.');
					setLoading(false);
				}
			})
			.catch((error) => {
				console.error(error);
				alert('Error: ' + error.message || 'An error occurred. Please try again.');
				setLoading(false);
			});
	}, []);

	return (
		<Global_Layout>
			<h1>Hello, {JSON.parse(user).name}</h1>

			{loading ? (
				<p>Loading...</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Address</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student.id}>
								<td>{student.id}</td>
								<td>{student.name}</td>
								<td>{student.email}</td>
								<td>{student.phone}</td>
								<td>{student.address}</td>
								<td>
									<div className='buttons'>
										<DeleteBtn id={student.id} list={[...students]} setList={setStudents} />
										{/* <EditBtn id={student.id} /> */}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</Global_Layout>
	);
};

export default Home;
