import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../Button/Button.component';
import CartItem from '../CartItem/CartItem.component';
import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems,
} from './CartDropdown.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout');
    }, [navigate]); // misleading since navigate comes from a react router hook and it would NOT change

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
