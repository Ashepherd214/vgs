import React, { Component, createContext, useEffect, useState } from "react";
import { auth, firestore, generateUserDocument } from "./Firestore";

export const AuthContext = createContext({ user:null });



class UserProvider extends Component {
	state = {
		user: null
	}

	componentDidMount = async () => {
	auth.onAuthStateChanged(async userAuth => {
		if (userAuth) {
			const user = await generateUserDocument(userAuth)
			this.setState({ user: user })
		}
	})
}
	render() {
		return (
			<AuthContext.Provider value={this.state.user}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
};


export default UserProvider;