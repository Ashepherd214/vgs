import { initializeApp, analytics } from "firebase/app";
//import { firebase } from 'firebase/compat/firestore';
import { Redirect } from "react-router"
import { doc, getFirestore, collection, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from 'react'

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: "AIzaSyBbeV0UBT98Q_2XT9H_XLhNV7bG72kJnq4",
	authDomain: "rsi-vgs.firebaseapp.com",
	databaseURL: "https://rsi-vgs.firebaseio.com",
	projectId: "rsi-vgs",
	storageBucket: "rsi-vgs.appspot.com",
	messagingSenderId: "294305445462",
	appId: "1:294305445462:web:fafc6a1df04bdc7b38adf7",
	measurementId: "G-J8ZDDB5LGS",
}

//Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore()
//analytics();

// const firebaseApp = firebase.initializeApp(firebaseConfig);

	// export const AuthContext = createContext()

	// export const AuthContextProvider = props => {
	// 	const [user, setUser] = useState()
	// 	const [error, setError] = useState()

	// 	useEffect(() => {
	// 		const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
	// 		return () => unsubscribe()
	// 	}, [])
	// 	return <AuthContext.Provider value={{ user,error }} {...props} />
	// }

	// export const useAuthState = () => {
	// 	const auth = useContext(AuthContext)
	// 	return { ...auth, isAuthenticated: auth.user !=null}
//	}

const authContext = createContext()

const authCheck = getAuth()

export function AuthProvider({ children }) {
	const auth = useProvideAuth()
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
	return useContext(authContext)
}

function useProvideAuth() {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const handleUser = (rawUser) => {
		if (rawUser) {
			const user = formatUser(rawUser)

			setLoading(false)
			setUser(user)
			return user
		} else {
			setLoading(false)
			setUser(false)
			return false
		}
	}

	const signinWithFirebase = (email, password) => {
		setLoading(true)
		signInWithEmailAndPassword (authCheck, email, password )
		.then((userCredential) => {
			//Signed In
			handleUser(userCredential.user)
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log("Sign in failed with the error: ", errorMessage, errorCode)

		})
	}

	const signout = () => {
		signOut(authCheck).then(() => {
			handleUser(false)
			return <Redirect to='/Login' />
		}).catch((error) => {
			console.log('Trouble signing out')
		})
		
		// return firebase
		// .auth()
		// .signout()
		// .then(() => handleUser(false))
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(handleUser)

		return () => unsubscribe()
	}, [])

	return {
		user,
		loading,
		signinWithFirebase,
		signout,
	}
}

const formatUser = (user) => {
	return {
		uid: user.id,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerID,
	}
}


//const firestore = firebase.firestore();
//export const auth = firebase.auth();

 // [START initialize_persistence]
    //   firestore.enablePersistence()
    //     .catch((err) => {
    //         if (err.code == 'failed-precondition') {
    //             // Multiple tabs open, persistence can only be enabled
    //             // in one tab at a a time.
    //             // ...
    //         } else if (err.code == 'unimplemented') {
    //             // The current browser does not support all of the
    //             // features required to enable persistence
    //             // ...
    //         }
    //     });
      // Subsequent queries will use persistence, if it was enabled successfully
      // [END initialize_persistence]

export const generateUserDocument = (user, useID, firstName, lastName, email) => {
	if(!useID) {
		return null
	} else {
	// console.log("on generation auth ID is " + useID)
	// console.log("on generation first name is " + firstName)
	// console.log("on generation last name is " + lastName)
	// console.log("on generation email is " + email)
		//return;
		createUser()
	}
/*		
	} else {
	

	let first = firstName
	let last = lastName
	let mail = email
	}
	if (!user.uid) {
		// const { email, firstName, lastName } = user;
		console.log(
			"Info for generating user doc: " +
				firstName +
				" " +
				lastName +
				" " +
				email
		);
		try {
			//needs to change to a form os firestore.collection("users").add({data})
			userRef.set({
				firstName: firstName,
				lastName: lastName,
				email: email,
			});
		} catch (error) {
			console.error("Error creating user document", error);
		}
	}
*/
	//console.log("User ID is: " + `${user.uid}`);
	//Firebase Version 9 doc call
	

	//const docSnap = await getDoc(docRef)
	// Firebase Version 8 doc call
	//const userRef = firestore.collection("users").doc(String(useID));
	 //Needs a specific uid to actually get any snapshot info
	//const userRef = firestore.collection("users").doc(String(user.uid)); //Needs a specific uid to actually get any snapshot info
	//const snapshot = userRef.get();
	//console.log("User found: " + userRef);
	//if (!snapshot.exists) {
		//const { email, firstName, lastName } = user;
		// console.log(
		// 	"Info for generating user doc: " +
		// 		useID + 
		// 		" " +
		// 		firstName +
		// 		" " +
		// 		lastName +
		// 		" " +
		// 		email
		// )
		// try {
			//needs to change to a form os firestore.collection("users").add({data})
			//Firebase Version 9 way
	async function createUser() {
		const userRef = doc(db, "users", String(useID))
		await setDoc((userRef), {
			firstName: firstName,
			lastName: lastName,
			email: email,
		});
	}

			//Firebase Version 8 way
			// userRef.set({
			// 	firstName: firstName,
			// 	lastName: lastName,
			// 	email: email,
			// });
		// } catch (error) {
		// 	console.error("Error creating user document", error);
		// }
	//}
	return
};

const getUserDocument = async (uid) => {
	if (!uid) {
		return null;
	}
	try {
		//Firebase Version 9 way
		const userRef = doc(db, "users", String(uid))
		const userDocument = await getDoc(userRef);

		// Firebase Version 8 way
		// const userDocument = await firestore.doc(`users/${uid}`).get();
		return {
			uid: uid,
			...userDocument.data(),
		};
	} catch (error) {
		console.error("Error fetching user", error);
	}
};


//Firebase Version 9 variable
export default db;

//Firebase Version 8 variable
//export default firestore;
