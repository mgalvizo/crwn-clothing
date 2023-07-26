import { createContext, useState } from 'react';

import PRODUCTS from '../shop-data.json';

const initialValue = {
    products: [],
};

const ProductsContext = createContext(initialValue);

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);

    const value = { products };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsProvider };
