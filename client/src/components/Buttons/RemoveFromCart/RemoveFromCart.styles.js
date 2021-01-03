import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

export const Button = styled.button`
  display: flex;
  margin-left: auto;
  ${ifProp('small', css`
  font-size: 0.8rem;
  `,
  css`
    font-size: 2rem;
  `)};
  border:none;
  background: none;
  cursor: pointer;
`;
