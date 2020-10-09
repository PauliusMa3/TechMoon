import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Logo from './StoreName';

const FooterContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
  overflow: hidden;
`;

const CopyrightSection = styled.div`
  font-size: 1rem;
`;

const LogoSection = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  justify-content: center;
  margin-bottom: 2rem;
  grid-gap: 10px;


  ${CopyrightSection} {
    justify-self: start;
    margin-top: 20px;
  }

  ${Logo} {
    justify-self: end;
  }
`;

const Links = styled.div`
  h4 {
    font-size: 20px;
    color: ${(props) => props.theme.colors.secondaryBlue};
  }

  ul {
    list-style: none;
    padding:0;
    margin: 0;
  }

  li {
    margin-bottom: 0.85rem;
  }

  a {
    color: ${(props) => props.theme.colors.black};
    font-size: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-top: 1.75rem;
  padding-bottom: 1.25rem;
  justify-items: center;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterLinks>
        <Links>
          <h4>About TechMoon</h4>
          <ul>
            <li>
              <Link href="/">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </Links>
        <Links>
          <h4>Client Information</h4>
          <ul>
            <li>
              <Link href="/">
                <a>Payment</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Delivery</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Returns </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Warranty </a>
              </Link>
            </li>
          </ul>
        </Links>
        <Links>
          <h4>My Account</h4>
          <ul>
            <li>
              <Link href="/">
                <a>Shopping Cart</a>
              </Link>
            </li>
          </ul>
        </Links>
      </FooterLinks>
      <LogoSection>
        <Logo />
        <CopyrightSection>
          &copy;
          {` ${currentYear} TechMoon - All rights Reserved.`}
          {' '}
        </CopyrightSection>
      </LogoSection>
    </FooterContainer>
  );
};

export default Footer;
