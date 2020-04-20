import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDW-6PU455pW5onUWxL4pqv6PB8PxKWmZY",
  authDomain: "react-clothing-demo.firebaseapp.com",
  databaseURL: "https://react-clothing-demo.firebaseio.com",
  projectId: "react-clothing-demo",
  storageBucket: "react-clothing-demo.appspot.com",
  messagingSenderId: "466679039736",
  appId: "1:466679039736:web:4f62fa3e7c053881bedd0d"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (e) {
      console.log('Error creating user', e.message);
    }

    return userRef;
  }
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
