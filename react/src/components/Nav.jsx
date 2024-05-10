import React from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import Cookies from 'js-cookie';
import './../assets/modules/nav.module.css';

const Nav = () => {
	const loggedIn = Cookies.get('access_token') ? true : false;

	return (
		<nav>
			{loggedIn ? (
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<LogoutBtn />
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to='/login'>Login</Link>
					</li>
					<li>
						<Link to='/register'>Register</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Nav;
