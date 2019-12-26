import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBbeV0UBT98Q_2XT9H_XLhNV7bG72kJnq4',
  authDomain: 'rsi-vgs.firebaseapp.com',
  databaseURL: 'https://rsi-vgs.firebaseio.com',
  projectId: 'rsi-vgs',
  storageBucket: 'rsi-vgs.appspot.com',
  messagingSenderId: '294305445462',
  appId: '1:294305445462:web:fafc6a1df04bdc7b38adf7',
  measurementId: 'G-J8ZDDB5LGS'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
