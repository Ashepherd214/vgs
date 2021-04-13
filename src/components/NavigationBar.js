import React from "react";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
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
	<Styles>
		{/* <Navbar expand='lg'> */}
		<Nav className='ml-auto'>
			<Navbar.Brand href='/'>
				<img
					src={logo}
					width='70'
					height='50'
					alt='RSi logo with dark background'
				/>
			</Navbar.Brand>
			{/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
			{/* <Navbar.Collapse id='basic-navbar-nav'> */}
			<Nav.Item>
				<Nav.Link href='/Login'>Login</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href='/Dashboard'>Home</Nav.Link>
			</Nav.Item>
			{/* <Nav.Item>
				<Nav.Link href='/about'>About</Nav.Link>
			</Nav.Item> */}
		</Nav>
		{/* </Navbar.Collapse> */}
		{/* </Navbar> */}
	</Styles>
);

export default NavigationBar;
