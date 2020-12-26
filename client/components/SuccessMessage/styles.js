import styled from 'styled-components';

export const SuccessMessageStyles = styled.div`
    width: 100%;
    padding: 1rem 1rem;
    border: 1px solid ${(props) => props.theme.colors.successGreen};
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    background: ${(props) => props.theme.colors.lightgreen};
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.successGreen};
    height: max-content;
    span {
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    }

    p {
        margin: 0;
        padding: 0;
    }

    transform: translateY(0%);
    transition: all 0.2 ease-in-out;

`;