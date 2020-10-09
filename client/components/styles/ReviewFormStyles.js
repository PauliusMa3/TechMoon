import styled from 'styled-components';

export const ReviewFormStyles = styled.form`
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  padding: 1rem;
  margin-bottom: 2rem;
  max-width: 700px;
  min-width: 600px;
  display: flex;
  flex-direction: column;

  fieldset {
    border: none;
    display: flex;
  }

  h2 {
    font-family: "Mont-bold";
    font-size: 1.2rem;
    text-align: center;
    text-transform: uppercase;
  }

  textarea {
    margin-top: 1rem;
    resize: none;
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    font-family: "Robo-regular";
    width: 100%;
    font-size: 1rem;

    height: 100px;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 50%;
    color: ${(props) => props.theme.colors.white};
    margin-top: 1rem;

    cursor: pointer;
    align-items: center;
    padding: 0.75rem 0;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;
    font-size: 0.9rem;

    background: #00b4db;
    background: linear-gradient(to right, #00b4db, #0083b0);
    transition: all 0.2s;

    &:hover {
      opacity: 0.8;
    }

    &:focus {
      outline: none;
    }
  }

  .review-meta {
    text-align: center;
    margin-top: 1rem;
    span {
      margin-top: 1rem;
      font-size: 1rem;
      color: ${(props) => props.theme.colors.black};
    }
    * > & {
      flex: 1;
    }
  }
  .review__stars {
    display: flex;
    justify-content: center;
    padding: 1rem;
    label {
      /* color: #ddd; */

      color: ${(props) => props.theme.colors.lightGrey};
    }
    input {
      display: none;
      &:checked {
        & ~ label {
          color: ${(props) => props.theme.colors.yellow};
        }
      }
      & + label {
        font-size: 0;
        &:before {
          content: "★";
          font-size: 2rem;
        }
        &[for="star5"] {
          order: 1;
        }
        &[for="star4"] {
          order: 2;
        }
        &[for="star3"] {
          order: 3;
        }
        &[for="star2"] {
          order: 4;
        }
        &[for="star1"] {
          order: 5;
        }
        &:hover,
        &:hover ~ label {
          color: lighten(yellow, 20%);
          cursor: pointer;
        }
      }
    }
  }
`;
