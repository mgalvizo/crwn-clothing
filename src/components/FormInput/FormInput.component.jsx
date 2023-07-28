import { FormInputLabel, Input, Group } from './FormInput.styles';

// Explicitly destructure the label to use it in the JSX
// spread the otherProps which can be type, onChange, required, etc...
const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel $shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
