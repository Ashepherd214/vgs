import firebase from "firebase";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBbeV0UBT98Q_2XT9H_XLhNV7bG72kJnq4",
	authDomain: "rsi-vgs.firebaseapp.com",
	databaseURL: "https://rsi-vgs.firebaseio.com",
	projectId: "rsi-vgs",
	storageBucket: "rsi-vgs.appspot.com",
	messagingSenderId: "294305445462",
	appId: "1:294305445462:web:fafc6a1df04bdc7b38adf7",
	measurementId: "G-J8ZDDB5LGS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();
export const auth = firebase.auth();

export const generateUserDocument = (user, firstName, lastName, email) => {
	if (!user) {
		return;
	}
	console.log("User ID is: " + `${user.uid}`);
	const userRef = firestore.collection("users");
	console.log("User found: " + user);
	const snapshot = userRef.get();


	// if (!user.uid) {
	// 	// const { email, firstName, lastName } = user;
	// 	console.log(
	// 		"Info for generating user doc: " +
	// 			firstName +
	// 			" " +
	// 			lastName +
	// 			" " +
	// 			email
	// 	);
	// 	try {
	// 		//needs to change to a form os firestore.collection("users").add({data})
	// 		userRef.set({
	// 			firstName: firstName,
	// 			lastName: lastName,
	// 			email: email,
	// 		});
	// 	} catch (error) {
	// 		console.error("Error creating user document", error);
	// 	}
	// }

	if (!snapshot.exists) {
		// const { email, firstName, lastName } = user;
		console.log(
			"Info for generating user doc: " +
				firstName +
				" " +
				lastName +
				" " +
				email + " " + user
		);
		try {
			//needs to change to a form os firestore.collection("users").add({data})
			userRef.add({
				firstName: firstName,
				lastName: lastName,
				email: email,
			});
		} catch (error) {
			console.error("Error creating user document", error);
		}
	}
	return generateUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
	if (!uid) {
		return null;
	}
	try {
		const userDocument = await firestore.doc(`users/${uid}`).get();
		return {
			uid: uid,
			...userDocument.data(),
		};
	} catch (error) {
		console.error("Error fetching user", error);
	}
};

export default firestore;
