import firebaseapp from "firebase";
import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";

class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			FirstName: "",
			LastName: "",
			Email: "",
			Password: "",
		};
	}

	handleChange = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "firstname") {
			this.setState({ FirstName: value });
		} else if (name === "lastname") {
			this.setState({ LastName: value });
		} else if (name === "email") {
			this.setState({ Email: value });
		} else if (name === "password") {
			this.setState({ Password: value });
		}
	};

	handleSubmit = (values, { setSubmitting, resetForm }) => {
		var email = values.email;
		var password = values.password;
		var firstname = values.firstname;
		var lastname = values.lastname;
		firebaseapp
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				//Signed in
				var user = userCredentials.user;
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
		setSubmitting(false);
	};

	render() {
		return (
			<Container>
				{/* <Form
					initialValues={{
						firstname: "",
						lastname: "",
						email: "",
						password: "",
					}}
					validate={(values) => {}}
					onSubmit={this.handleSubmit}
				>
					{({ touched, errors, isSubmitting, handleSubmit, values }) => ( */}
				<Form>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter First Name'
							name='firstname'
							value={this.state.FirstName}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter Last Name'
							name='lastname'
							value={this.state.LastName}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter Email Name'
							name='email'
							value={this.state.Email}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter Password Name'
							name='password'
							value={this.state.Password}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Button
						variant='primary'
						type='submit'
						onClick={(event) => {
							this.handleSubmit();
						}}
					>
						Submit
					</Button>
				</Form>
				{/* )}
				</Formik> */}
			</Container>
		);
	}
}

export default RegisterForm;
