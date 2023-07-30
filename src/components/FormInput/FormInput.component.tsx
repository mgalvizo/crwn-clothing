import { InputHTMLAttributes } from 'react';
import { FormInputLabel, Input, Group } from './FormInput.styles';

type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

// Explicitly destructure the label to use it in the JSX
// spread the otherProps which can be type, onChange, required, etc...
const FormInput = ({ label, ...otherProps }: FormInputProps) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel
                    $shrink={Boolean(
                        otherProps.value &&
                            typeof otherProps.value === 'string' &&
                            otherProps.value.length
                    )}
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
