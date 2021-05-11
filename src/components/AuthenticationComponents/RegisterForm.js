import React, { Component, useContext, useState } from "react";
import { AuthContext } from "../../Auth";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import { firestore, auth, generateUserDocument } from "../../Firestore";

const RegisterForm = () => {
	const [regEmail, setEmail] = useState("");
	const [regPassword, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [error, setError] = useState(null);

	const user = useContext(AuthContext);

	const handleChange = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "firstName") {
			setFirstName(value);
			console.log("first in reg: " + firstName);
		} else if (name === "lastName") {
			setLastName(value);
			console.log("last in reg: " + lastName);
		} else if (name === "regEmail") {
			setEmail(value);
			console.log("email in reg: " + regEmail);
		} else if (name === "regPassword") {
			setPassword(value);
			console.log(regPassword);
		}
	};

	const handleSubmit = (event, regEmail, regPassword, firstName, lastName) => {
		event.preventDefault();
		console.log("Name is: " + firstName + " " + lastName);
		console.log("Email submitting as: " + regEmail);
		try {
			const user = auth.createUserWithEmailAndPassword(regEmail, regPassword);
			console.log("User created on submit: " + user);
			generateUserDocument(user, firstName, lastName, regEmail);
			console.log("Login Successful");
		} catch (error) {
			setError("Error Signing up with email and password");
		}

		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		return <Redirect to='/Login' />;
	};

	return (
		<Container>
			<Form id="register_form">
				<Form.Group>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter First Name'
						name='firstName'
						id='firstName'
						value={firstName}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Last Name'
						name='lastName'
						id='lastName'
						value={lastName}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email Name'
						name='regEmail'
						id='regEmail'
						value={regEmail}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password Name'
						name='regPassword'
						id='regPassword'
						value={regPassword}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					value='registerbtn'
					onClick={(event) => {
						handleSubmit(event, regEmail, regPassword, firstName, lastName);
					}}
				>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default RegisterForm;
