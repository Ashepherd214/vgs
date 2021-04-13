import React, { Component } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Form from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

class Authentication extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Tabs>
					<Tab eventKey='login' title='Login'>
						<Container>
							<LoginForm />
						</Container>
					</Tab>
					<Tab eventKey='register' title='Register'>
						<Container>
							<RegisterForm />
						</Container>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default Authentication;
