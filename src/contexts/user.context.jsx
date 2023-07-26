import { createContext, useState, useEffect } from 'react';

import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../utils/firebase.utils';

const initialValue = {
    setCurrentUser: () => {},
    currentUser: null,
};

const UserContext = createContext(initialValue);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    console.log(currentUser);

    // Open listener will stop listening when component unmounts
    // It will check the authentication state automatically
    // returns a user or null
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };
