import styled from 'styled-components';

const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px 0;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export { SignInContainer, ButtonsContainer };
