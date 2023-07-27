import { createContext, useState, useEffect } from 'react';
import {
    // addCollectionAndDocuments,
    getCategoriesAndDocuments,
} from '../utils/firebase.utils';
// import SHOP_DATA from '../shop-data';

// We use empty object because we are interfacing with the object's keys in order to get the corresponding item for the category
const initialValue = {
    categoriesMap: {},
};

const CategoriesContext = createContext(initialValue);

const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // Only run once and comment the following code to populate DB
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);

            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};

export { CategoriesContext, CategoriesProvider };
