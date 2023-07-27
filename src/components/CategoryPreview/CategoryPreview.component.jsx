import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard.component';
import {
    CategoryPreviewContainer,
    Title,
    Preview,
} from './CategoryPreview.styles';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {/* Returns an array with only the first four elements for the preview */}
                {products
                    .filter((_, idx) => idx < 4)
                    .map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
