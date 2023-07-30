import { ReactNode, ButtonHTMLAttributes } from 'react';
import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    ButtonSpinner,
} from './Button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

// Function that gets the class of the button
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

export type ButtonProps = {
    children?: ReactNode;
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
    // Adding the other of props of a button
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    buttonType,
    isLoading = false,
    ...otherProps
}: ButtonProps) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
};

export default Button;
