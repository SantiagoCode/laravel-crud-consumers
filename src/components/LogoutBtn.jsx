import React from 'react';
import Cookies from 'js-cookie';

const LogoutBtn = () => {
	return (
		<button
			onClick={() => {
				Cookies.remove('access_token');
				window.location.href = '/login';
			}}>
			Logout
		</button>
	);
};

export default LogoutBtn;
