import React, { useState } from 'react';
import Global_Layout from '../components/Global_Layout.jsx';
import { fetchApi } from './../utils/data.js';
import './../assets/modules/form.module.css';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmed, setPasswordConfirmed] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			name: name,
			email: email,
			phone: phone,
			address: address,
			password: password,
			password_confirmation: passwordConfirmed,
		};

		try {
			const response = await fetchApi.simplePOST('register', data);

			if (!response) throw new Error('No response received');
			if (response.error) throw new Error(response.error);

			window.location.href = '/login';
		} catch (error) {
			console.error(error);
			alert('Error: ' + error.message || 'An error occurred. Please try again.');
		}
	};

	return (
		<Global_Layout>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' id='name' defaultValue={name} onChange={(e) => setName(e.target.value)} />
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='phone'>Phone</label>
				<input type='text' name='phone' id='phone' defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
				<label htmlFor='address'>Address</label>
				<input type='text' name='address' id='address' defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
				<label htmlFor='passwordConfirmed'>Confirm Password</label>
				<input
					type='password'
					name='passwordConfirmed'
					id='passwordConfirmed'
					defaultValue={passwordConfirmed}
					onChange={(e) => setPasswordConfirmed(e.target.value)}
				/>
				<button type='submit'>Register</button>
			</form>
		</Global_Layout>
	);
};

export default Register;
