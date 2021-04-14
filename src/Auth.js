import React, { createContext, useEffect, useState } from "react";
import { auth } from "firebase"
import firebaseapp from "./Firestore";

export const AuthContext = createContext({userPresent:false, user:null});

export default function FirebaseAuthContext(props){

	let [state, changeState] = useState({
		userDataPresent:false,
		user:null,
		listener:null
	})


	// const [currentUser, setCurrentUser] = useState();
	// const [pending, setPending] = useState(true);

	useEffect(() => {
		if(state.listener == null){
			changeState({...state, listener:firebaseapp.auth().onAuthStateChanged((user) => {
				if(user){
					changeState(oldState => ({...oldState, userDataPresent: true, user: user}))
				} else {
					changeState(oldState => ({...oldState, userDataPresent: true, user: null}))
				}
			})})
		}
		return () => {
			if(state.listener) {
				state.listener()
			}

		}
	}, []);

	return (
		<AuthContext.Provider
			value={state}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

