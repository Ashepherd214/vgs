import React, { Component, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import { firestore, auth, generateUserDocument } from "../../Firestore";

const RegisterForm = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [error, setError] = useState(null)

	const handleChange = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "firstname") {
			setFirstName(value)
		} else if (name === "lastname") {
			setLastName(value)
		} else if (name === "email") {
			setEmail(value)
		} else if (name === "password") {
			setPassword(value)
		}
	};

	const handleSubmit = async (event, email, password, firstname, lastname) => {
		event.preventDefault()

		const user = await auth.createUserWithEmailAndPassword(email, password)
		.then(() => {
			generateUserDocument(user, firstName, lastName)
			console.log("Login Successful")
			
			setEmail("")
			setPassword("")
			setFirstName("")
			setLastName("")
			return <Redirect to="/Login" />
		})
		.catch((error) => {
			setError("Error Signing up with email and password")
		})
	};

		return (
			<Container>
				<Form>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter First Name'
							name='firstname'
							id='firstname'
							value={firstName}
							onChange={event => handleChange(event)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter Last Name'
							name='lastname'
							id='lastname'
							value={lastName}
							onChange={event => handleChange(event)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter Email Name'
							name='email'
							id="email"
							value={email}
							onChange={event => handleChange(event)}
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
							onChange={event => handleChange(event)}
						/>
					</Form.Group>
					<Button
						variant='primary'
						type='submit'
						onClick={event => {
							handleSubmit(event, email, password, firstName, lastName)
						}}
					>
						Submit
					</Button>
				</Form>
			</Container>
		);
}

export default RegisterForm;
