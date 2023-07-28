import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview.component';
import Category from '../Category/Category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
import './Shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments(
                'categories'
            );
            dispatch(setCategories(categoriesArray));
        };

        getCategoriesMap();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            {/* Dynamic segment */}
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
