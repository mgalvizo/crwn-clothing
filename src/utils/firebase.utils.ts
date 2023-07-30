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
    NextOrObserver,
    User,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../store/categories/category.types';

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

export type ObjectToAdd = {
    title: string;
};

// The key is the name of the collection in firestore
// The objectsToAdd are the actual documents
// If the async function does NOT return data set it to Promise<void>
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    // Get collection reference or creates one if it does NOT exist
    const collectionRef = collection(db, collectionKey);
    // Create batch instance that allowa writes, deletes, sets, etc...
    const batch = writeBatch(db);

    // If an action in a transaction fails, the whole transaction will fail
    // To make sure all objects are added we use a batch
    objectsToAdd.forEach(object => {
        // Get document reference or creates one if does NOT exist
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    // Get collection reference or creates one if does NOT exist
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    // fetch all document snapshots
    const querySnapshot = await getDocs(q);

    // Only return all document snapshots data
    return querySnapshot.docs.map(
        docSnapshot => docSnapshot.data() as Category
    );
};

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};

// User creation
export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
            console.log('error creating the user', err);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    await signOut(auth);
};

// This observer will return back whatever you get back from onAuthStateChanged
// Will run the callback whenever the authentication state of our auth singleton changes (sign in, sign out)
// Adds an observer for changes to the user's sign-in state
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback);
};

// From Observable listener to Promise based function call transformation
export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};
