import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview.component';
import Category from '../Category/Category.component';
import './Shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            {/* Dynamic segment */}
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
