import React from "react";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
import { auth } from "../Firestore";
import logo from "../img/RSiIconDark.png";
const Styles = styled.div`
	// .navbar
	.nav {
		background-color: #222;
	}
	a,
	.navbar-nav,
	.navbar-light .nav-link {
		color: #00b4ef;
		&:hover {
			color: white;
		}
	}
	.navbar-brand {
		font-size: 1.4em;
		color: #9fffcb;
		&:hover {
			color: white;
		}
	}
`;
const NavigationBar = () => (
	<Navbar className='ml-auto' style={{ backgroundColor: "#222" }}>
		<Navbar.Brand href='/'>
			<img
				src={logo}
				width='70'
				height='50'
				alt='RSi logo with dark background'
			/>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav.Link href='/Login'>Login</Nav.Link>
			<Nav.Link href='/Dashboard'>Home</Nav.Link>
			<Nav.Link
				href='/Logoff'
				onClick={() => {
					auth.signOut();
				}}
			>
				Sign Out
			</Nav.Link>
		</Navbar.Collapse>
	</Navbar>
);

export default NavigationBar;
