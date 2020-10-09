import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ErrorBannerStyles = styled.div`
  position: fixed;
  top: 110px;
  right: 20%;
  background: red;
  display: inline-block;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.errorRed};
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white};
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.errorRed};
  /* transform: translateY(100%);
  transform:translateY(-100%); */
  transition: all 0.2s;

  h3 {
    font-family: "Mont-bold";
  }

  .error_banner_info {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    align-items: center;
    letter-spacing: 2px;
  }
  .error_banner_actions {
      display: flex;
      justify-content: flex-end;
    a {
      color: ${(props) => props.theme.colors.errorRed};
      font-size: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ErrorCatcher = ({ error, shouldLogin }) => {
  const [isDisplayed, setIsDisplayed] = useState(true);

  return (
    isDisplayed ? (
      <ErrorBannerStyles>
        <div className="error_banner_info">
          <h3>Error</h3>
          <div>     

            
            <span>{error.message}</span>
          </div>
        </div>

        <div className="error_banner_actions">
          {shouldLogin && (
          <Link href="/signin">
            <a onClick={() => {
              setIsDisplayed(false);
            }}
            >
              Log In

            </a>
          </Link>
          )}
        </div>
      </ErrorBannerStyles>
    ) : null
  );
};

export default ErrorCatcher;
