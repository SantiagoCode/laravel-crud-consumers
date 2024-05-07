import React from 'react';
import { Link } from 'react-router-dom';
import './../assets/modules/nav.module.css';

const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/login'>Login</Link>
				</li>
				<li>
					<Link to='/register'>Register</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
