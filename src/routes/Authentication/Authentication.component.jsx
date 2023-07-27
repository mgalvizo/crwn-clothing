import SignUpForm from '../../components/SignUpForm/SignUpForm.component';
import SignInForm from '../../components/SignInForm/SignInForm.component';
import AuthenticationContainer from './Authentication.styles';

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;
