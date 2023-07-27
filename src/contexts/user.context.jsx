import { createContext, useEffect, useReducer } from 'react';
import { createAction } from '../utils/reducer.utils';
import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../utils/firebase.utils';

const initialValue = {
    setCurrentUser: () => {},
    currentUser: null,
};

const UserContext = createContext(initialValue);

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// Only readable values for reducer
const initialState = {
    currentUser: null,
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, initialState);

    const setCurrentUser = user => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };

    // Open listener will stop listening when component unmounts
    // It will check the authentication state automatically
    // returns a user or null
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    console.log(currentUser);

    const value = {
        currentUser,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };
