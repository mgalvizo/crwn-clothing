// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyC8T1kMRC4bv_QV4RsGnNgd0cS7r3CQOCM',
    authDomain: 'crwn-app-fd83d.firebaseapp.com',
    projectId: 'crwn-app-fd83d',
    storageBucket: 'crwn-app-fd83d.appspot.com',
    messagingSenderId: '1069496930834',
    appId: '1:1069496930834:web:bfc25988b9ca5d64fafecb',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// The providers you select in the console you can add them like this
const googleProvider = new GoogleAuthProvider();

// Particular configuration that Google wants
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

// Singleton that keeps track of the authentication state of the entire app
export const auth = getAuth();

// The database
export const db = getFirestore();

// Create functions here, these will interface with firebase which is our external service
// In case a method change the only place we need to refactor is this file
// This pattern avoids refactoring the whole app if some method changes over time in Firebase

export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

// Will reinitialize entire app state because of redirection
// Use it inside a useEffect (check video Sign In With Redirect)
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

// User creation
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    // Pass the database, the name of the collection and the user id from the authentication (unique id)
    // Gets a reference to a document in the database or creates one if it doesn't exist when logging the user in
    const userDocRef = doc(db, 'users', userAuth.uid);

    // Actual user data
    const userSnapshot = await getDoc(userDocRef);

    // Will set data for a user document if it does NOT exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            // Set the document data
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    await signOut(auth);
};

// This observer will return back whatever you get back from onAuthStateChanged
// Will run the callback whenever the authentication state of our auth singleton changes (sign in, sign out)
// Adds an observer for changes to the user's sign-in state
export const onAuthStateChangedListener = callback => {
    onAuthStateChanged(auth, callback);
};
