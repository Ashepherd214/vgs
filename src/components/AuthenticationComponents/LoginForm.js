import React, { useCallback, useContext, Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import firebase from "../../Firestore";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../../Auth.js";

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Email: "",
			Password: "",
		};
	}

	// LoginForm = ({ history }) => {
	// handleLogin = useCallback(
	// 	async (event) => {
	// 		event.preventDefault();
	// 		const { email, password } = event.target.elements;
	// 		try {
	// 			await firebase
	// 				.auth()
	// 				.signInWithEmailAndPassword(email.value, password.value)
	// 				.then((userCredential) => {
	// 					var user = userCredential.user;
	// 					if (user) {
	// 						props.history.push("/Dashboard");
	// 					} else {
	// 						return <Redirect to='/Login' />;
	// 					}
	// 				});
	// 		} catch (error) {
	// 			alert(error);
	// 		}
	// 	},
	// 	[history]
	// );

	// };
	// const { currentUser } = useContext(AuthContext);

	// if (!currentUser) {
	// 	return <Redirect to='/Login' />;
	// }

	handleChange = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "email") {
			this.setState({ Email: value });
		} else if (name === "password") {
			this.setState({ Password: value });
		}
	};

	handleSubmit = (values, { setSubmitting, resetForm }) => {
		var email = values.email;
		var password = values.password;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				//Signed in
				var user = userCredentials.user;
				if (user) {
					console.log("Sign in Successful");
					return <Redirect to='/Dashboard' />;
				} else {
					return <Redirect to='/Login' />;
				}
				//return history.push("/Dashboard");
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
			});
		setSubmitting(false);
	};

	render() {
		return (
			<Container>
				{/* <Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validate={(values) => {}}
					onSubmit={this.handleSubmit}
				>
					{({
						touched,
						errors,
						isSubmitting,
						handleSubmit,
						handleChange,
						values,
					}) => ( */}
				<Form>
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
			</Container>
		);
	}
}

export default LoginForm;
