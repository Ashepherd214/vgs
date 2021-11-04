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

 // [START initialize_persistence]
      firebase.firestore().enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
      // Subsequent queries will use persistence, if it was enabled successfully
      // [END initialize_persistence]

export const generateUserDocument = (user, useID, firstName, lastName, email) => {
	if(!useID) {
		return null
	} else {
	console.log("on generation auth ID is " + useID)
	console.log("on generation first name is " + firstName)
	console.log("on generation last name is " + lastName)
	console.log("on generation email is " + email)
		//return;
	
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
	const userRef = firestore.collection("users").doc(String(useID)); //Needs a specific uid to actually get any snapshot info
	//const userRef = firestore.collection("users").doc(String(user.uid)); //Needs a specific uid to actually get any snapshot info
	//const snapshot = userRef.get();
	//console.log("User found: " + userRef);
	//if (!snapshot.exists) {
		//const { email, firstName, lastName } = user;
		console.log(
			"Info for generating user doc: " +
				useID + 
				" " +
				firstName +
				" " +
				lastName +
				" " +
				email
		)
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
	//}
	return
	}
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
