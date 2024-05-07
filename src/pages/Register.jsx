import React, { useState } from 'react';
import Nav from './../components/Nav';
import { fetchApi } from './../utils/data.js';
import './../assets/modules/form.module.css';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmed, setPasswordConfirmed] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			name: name,
			email: email,
			phone: phone,
			address: address,
			password: password,
			password_confirmation: passwordConfirmed,
		};

		fetchApi
			.simplePOST(data, 'register')
			.then((response) => {
				console.log('Registered successfully');
				window.location.href = '/login';
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<Nav />
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='phone'>Phone</label>
				<input type='text' name='phone' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
				<label htmlFor='address'>Address</label>
				<input type='text' name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				<label htmlFor='passwordConfirmed'>Confirm Password</label>
				<input type='password' name='passwordConfirmed' id='passwordConfirmed' value={passwordConfirmed} onChange={(e) => setPasswordConfirmed(e.target.value)} />

				<button type='submit'>Register</button>
			</form>
		</>
	);
};

export default Register;
