import { useNavigate } from 'react-router-dom';
import {
    BackgroundImage,
    Body,
    DirectoryItemContainer,
} from './DirectoryItem.styles';
import { DirectoryCategory } from '../Directory/Directory.component';

type DirectoryItemProps = {
    category: DirectoryCategory;
};

const DirectoryItem = ({ category }: DirectoryItemProps) => {
    const { imageUrl, title, route } = category;

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            {/* Transient props from styled components prevent props meant to be consumed by styled components from being passed to the underlying React node,
                prefix the prop name with a dollar sign ($), turning it into a transient prop.
            */}
            <BackgroundImage $imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
