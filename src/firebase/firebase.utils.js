import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCI3848LyWFQ6OBVHNmIDdknQxNhyD2x78",
    authDomain: "idolminds-db.firebaseapp.com",
    databaseURL: "https://idolminds-db.firebaseio.com",
    projectId: "idolminds-db",
    storageBucket: "idolminds-db.appspot.com",
    messagingSenderId: "703776001038",
    appId: "1:703776001038:web:a4425e60a836a279a2405f",
    measurementId: "G-XYQGLT45KL"
};

firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log("error creating new User", error.message);
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;