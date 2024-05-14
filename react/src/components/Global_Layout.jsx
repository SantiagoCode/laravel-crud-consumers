import React from 'react';
import Nav from './Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<main className='main'>{children}</main>
			<ToastContainer />
		</>
	);
};

export default Layout;
