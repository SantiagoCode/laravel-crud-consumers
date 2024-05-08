import React from 'react';
import Nav from './Nav';

const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<main className='main'>{children}</main>
		</>
	);
};

export default Layout;
