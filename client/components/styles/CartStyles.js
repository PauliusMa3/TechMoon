import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";

export const Button = styled.button`
  width: 100%;
  cursor: pointer;
  justify-content: center;
  padding: 0.75rem 0;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  font-size: 0.9rem;

  ${ifProp(
    "checkout",
    css`
      display: grid;
      grid-template-columns: 1fr 200px;
      align-items: center;
    `,
    css`
      display: flex;
    `
  )}

  ${ifProp(
    "primary",
    css`
      background: linear-gradient(to right, #00b4db, #0083b0);
      color: ${props => props.theme.colors.white};

      &:hover {
        opacity: 0.8;
      }
    `,
    css`
      background: white;
      border: 2px solid ${props => props.theme.colors.black};
      color: ${props => props.theme.colors.black};

      &:hover {
        background: ${props => props.theme.colors.black};
        color: ${props => props.theme.colors.white};
        opacity: 1;
      }
    `
  )}

  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const TotalPrice = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.white};
  font-family: "Mont-bold";
  font-size: 1rem;
  letter-spacing: 2px;
`;

export const CartContainer = styled.div`
  position: relative;
  border-left: 1px solid ${props => props.theme.colors.lightGrey};
  border-top: 1px solid ${props => props.theme.colors.lightGrey};
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 40%;
  position: fixed;
  max-width: 500px;
  max-height: calc(100vh - 110px);
  right: 0;
  top: 110px;
  bottom: 0;
  background: white;
  transform: ${(props) =>
    props.isOpen ? `translateX(0%)` : `translateX(100%)`};
  transition: all 0.3s;
  z-index: 2;
  line-height: 17px;

  header {
    font-size: 1.3rem;
    border-bottom: 1px solid ${props => props.theme.colors.lightGrey};
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-weight: 800;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  ul {
    z-index: 5000;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
  }

  footer {
    border-top: 1px solid ${props => props.theme.colors.lightGrey};
    padding: 1.5rem;

    ${Button}:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;
