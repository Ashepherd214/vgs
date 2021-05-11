import React, { useCallback, useContext, Component, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { firestore, auth } from "../../Firestore";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../../Auth.js";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "loginEmail") {
			setEmail(value)
		} else if (name === "loginPassword") {
			setPassword(value)
		}
	};

	const handleSubmit = (event, email, password) => {
		event.preventDefault();
		console.log("Login email is: " + email);
		console.log("Login password is: " + password);
		auth.signInWithEmailAndPassword(email, password).catch((error) => {
			setError("Error signing in with password and email.");
			console.error("Error signing in with password and email.", error);
			return <Redirect to='/Dashboard' />;
		});
	};

	return (
		<Container>
			<Form>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
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
						required
						type='password'
						placeholder='Enter Password Name'
						name='password'
						id='password'
						value={password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					onClick={(event) => {
						handleSubmit(event, email, password);
					}}
				>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default LoginForm;
