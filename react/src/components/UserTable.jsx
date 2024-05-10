import React from 'react';
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';
import Cookies from 'js-cookie';

const UserTable = ({ students, setStudents, edit, setEdit }) => {
	const userCookies = Cookies.get('user');
	const user = JSON.parse(userCookies);

	return (
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
								{user.id !== student.id && <DeleteBtn id={student.id} list={[...students]} setList={setStudents} />}
								<EditBtn id={student.id} edit={edit} setEdit={setEdit} setList={setStudents} />
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;
