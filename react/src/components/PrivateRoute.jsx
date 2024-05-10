import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component }) {
	const isAuthenticated = Cookies.get('access_token') ? true : false;

	return isAuthenticated ? <Component /> : <Navigate to='/login' />;
}

export default PrivateRoute;
