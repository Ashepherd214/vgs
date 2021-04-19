import firebase from "firebase";
import "firebase/auth"

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

const firestore = firebase.firestore()
export const auth = firebase.auth()



export const generateUserDocument = async (user, additionalData) => {
	if (!user){
		return
	} 
	const userRef = firestore.doc(`users/${user.uid}`)
	const snapshot = await userRef.get()
	if (!snapshot.exists) {
		const { email, firstName, lastName } = user
		console.log("First Name is: " + firstName + " and last name is: " + lastName)
		try {
			await userRef.set({
				firstName,
				lastName,
				email,
				...additionalData
			})
		} catch (error) {
			console.error("Error creating user document", error)
		}
	}
	return generateUserDocument(user.uid)
}

const getUserDocument = async uid => {
	if (!uid) {
		return null
	}
	try {
		const userDocument = await firestore.doc(`users/${uid}`).get()
		return {
			uid,
			...userDocument.data()
		}
	} catch (error) {
		console.error("Error fetching user", error)
	}
}


export default firestore
