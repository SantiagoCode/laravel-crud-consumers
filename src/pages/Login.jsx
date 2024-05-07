import React, { useState } from 'react';
import Nav from './../components/Nav';
import { fetchApi } from './../utils/data.js';
import './../assets/modules/form.module.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email,
			password: password,
		};

		fetchApi
			.simplePOST(data, 'login')
			.then((response) => {
				localStorage.setItem('access_token', response.access_token);
				window.location.href = '/';
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<Nav />
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</>
	);
};

export default Login;
