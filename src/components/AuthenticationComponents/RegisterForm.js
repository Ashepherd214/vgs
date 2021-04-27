import React, { Component, useContext, useState } from "react";
import { AuthContext } from "../../Auth";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import { firestore, auth, generateUserDocument } from "../../Firestore";

const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
		} else if (name === "email") {
			setEmail(value);
			console.log("email in reg: " + email);
		} else if (name === "password") {
			setPassword(value);
			console.log(password);
		}
	};

	const handleSubmit = async (event, email, password) => {
		event.preventDefault();
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			generateUserDocument(user, { firstName }, { lastName }, { email });
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
			<Form>
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
						name='email'
						id='email'
						value={email}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password Name'
						name='password'
						id='password'
						value={password}
						onChange={(event) => handleChange(event)}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					onClick={(event) => {
						handleSubmit(event, email, password, firstName, lastName);
					}}
				>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default RegisterForm;
