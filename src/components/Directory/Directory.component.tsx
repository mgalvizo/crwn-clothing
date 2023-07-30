import { Key } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DirectoryItem from '../DirectoryItem/DirectoryItem.component';
import DirectoryContainer from './Directory.styles';

export type DirectoryCategory = {
    id: Key;
    title: string;
    imageUrl: string;
    route: string;
};

const CATEGORIES: DirectoryCategory[] = [
    {
        id: uuidv4(),
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        route: 'shop/hats',
    },
    {
        id: uuidv4(),
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        route: 'shop/jackets',
    },
    {
        id: uuidv4(),
        title: 'sneakers',
        imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        route: 'shop/sneakers',
    },
    {
        id: uuidv4(),
        title: 'womens',
        imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
        route: 'shop/womens',
    },
    {
        id: uuidv4(),
        title: 'mens',
        imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
        route: 'shop/mens',
    },
];

const Directory = () => {
    return (
        <DirectoryContainer>
            {CATEGORIES.map(category => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </DirectoryContainer>
    );
};

export default Directory;
