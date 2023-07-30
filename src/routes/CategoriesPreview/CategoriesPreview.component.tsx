import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
    selectCategoriesMap,
    selectIsLoading,
} from '../../store/categories/category.selector';
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview.component';
import Spinner from '../../components/Spinner/Spinner.component';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview
                            key={title}
                            title={title}
                            products={products}
                        />
                    );
                })
            )}
        </Fragment>
    );
};

export default CategoriesPreview;
