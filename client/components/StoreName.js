import styled from 'styled-components';
import Link from 'next/link';

const StoreNameStyles = styled.h1`
  display: inline-block;
  background: #00719c;
  position: relative;
  padding: 4px 5px;
  height: 40px;

  a {
    font-size: 1.75rem;
    margin: 0;
    z-index: 2;
    text-align: center;
    font-family: "Mont-bold";
    color: white;
  }

  transform: skew(-15deg);
`;

const StoreName = ({size}) => {
    return (
      <StoreNameStyles size={size}>
        <Link href="/">
          <a>TechMoon</a>
        </Link>
      </StoreNameStyles>
    );
}

export default StoreName;