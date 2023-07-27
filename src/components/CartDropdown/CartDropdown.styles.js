import styled from 'styled-components';
// Import the components that will be nested in a styled component first
import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
} from '../button/button.styles';

const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    // Nested components inside this container
    ${BaseButton},
    ${GoogleSignInButton},
    ${InvertedButton} {
        margin-top: auto;
    }
`;

const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`;

const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

export { CartDropdownContainer, EmptyMessage, CartItems };
