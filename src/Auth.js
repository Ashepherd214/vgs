import React, { createContext, useEffect, useState } from "react";
import firebaseapp from "./Firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [pending, setPending] = useState(true);

	useEffect(() => {
		if (!currentUser) {
			return;
		}
		firebaseapp.auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	if (pending) {
		return <>Loading...</>;
	}

	return (
		<AuthContext.Provider
			value={{
				currentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default { AuthContext };
