import React, { useState } from 'react';
import Nav from './../components/Nav';
import { fetchApi } from './../utils/data.js';
import Cookies from 'js-cookie';
import './../assets/modules/form.module.css';

const Login = () => {
	if (Cookies.get('access_token')) {
		window.location.href = '/';
	}

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email,
			password: password,
		};

		fetchApi
			.simplePOST('login', data)
			.then((response) => {
				try {
					if (response.error) throw new Error(response.error);

					Cookies.set('access_token', response.access_token);
					Cookies.set('user', JSON.stringify(response.user));

					window.location.href = '/';
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

	return (
		<>
			<Nav />
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</>
	);
};

export default Login;
