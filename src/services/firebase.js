import firebase from 'firebase/app';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyCZ-wBfR81dmKoNhphIjjl1HMOZlYJVNUk",
    authDomain: "react-kids-medicine-tracker.firebaseapp.com",
    projectId: "react-kids-medicine-tracker",
    storageBucket: "react-kids-medicine-tracker.appspot.com",
    messagingSenderId: "670453325498",
    appId: "1:670453325498:web:7eb674ead6ef93de592c83"
  

  };
  

  firebase.initializeApp(config);
  
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const auth = firebase.auth();

function login () {
    auth.signInWithPopup(googleProvider);
}

function logout () {
  auth.signOut();

}

export {
  login,
  logout,
  auth

}
