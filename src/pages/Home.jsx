import React, { useEffect, useState } from 'react';
import { fetchApi } from '../utils/data';
import Global_Layout from '../components/Global_Layout';
import EditBtn from '../components/EditBtn';
import DeleteBtn from '../components/DeleteBtn';
import Cookies from 'js-cookie';
import './../assets/modules/table.module.css';

const Home = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [edit, setEdit] = useState(null);
	const user = Cookies.get('user');

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
								{!edit || student.id !== edit ? (
									<>
										<td data-user={student.id}>{student.id}</td>
										<td data-user={student.id}>{student.name}</td>
										<td data-user={student.id}>{student.email}</td>
										<td data-user={student.id}>{student.phone}</td>
										<td data-user={student.id}>{student.address}</td>
									</>
								) : (
									<>
										<td data-user={student.id}>{student.id}</td>
										<td data-user={student.id}>
											<input name='name' autoComplete='false' defaultValue={student.name} type='string' />
										</td>
										<td data-user={student.id}>
											<input name='email' autoComplete='false' defaultValue={student.email} type='email' />
										</td>
										<td data-user={student.id}>
											<input name='phone' autoComplete='false' defaultValue={student.phone} type='number' />
										</td>
										<td data-user={student.id}>
											<input name='address' autoComplete='false' defaultValue={student.address} type='string' />
										</td>
									</>
								)}
								<td>
									<div className='buttons'>
										<DeleteBtn id={student.id} list={[...students]} setList={setStudents} />
										<EditBtn id={student.id} edit={edit} setEdit={setEdit} setList={setStudents} />
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
