import './FormInput.styles.scss';

// Explicitly destructure the label to use it in the JSX
// spread the otherProps which can be type, onChange, required, etc...
const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && (
                <label
                    className={`${
                        otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;
