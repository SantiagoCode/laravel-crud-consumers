import React, { useState } from 'react';
import Global_Layout from '../components/Global_Layout.jsx';
import { fetchApi } from './../utils/data.js';
import Cookies from 'js-cookie';
import './../assets/modules/form.module.css';
import { toast } from 'react-toastify';

const Login = () => {
	if (Cookies.get('access_token')) {
		window.location.href = '/';
	}

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			email: email,
			password: password,
		};

		try {
			const response = await fetchApi.simplePOST('login', data);

			Cookies.set('access_token', response.access_token);
			Cookies.set('user', JSON.stringify(response.user));

			toast.success('Login successful! Redirecting...', {
				position: 'bottom-right',
				autoClose: 1,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: 1,
			});

			setTimeout(() => (window.location.href = '/'), 1000);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Global_Layout>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</Global_Layout>
	);
};

export default Login;
