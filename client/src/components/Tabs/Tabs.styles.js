import styled from 'styled-components';
export const TabsStyles = styled.div`
           display: flex;
           align-items: center;
           margin-top: 2rem;
           padding: 0 2rem;

           border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};

           *:not(:last-child) {
               margin-right: 4rem;
           }
           .tab {
               text-decoration: none;
               text-transform: capitalize;
               display: inline-block;
               padding: 16px;
               border: none;
               outline: none;
               font-size: 16px;
               font-weight: 500;
               background: transparent;
               color: rgba(0, 0, 0, 0.5);
               margin: 4px;
               cursor: pointer;

               &:hover {
                   color: rgba(0, 0, 0, 0.8);
                   background-color: rgba(0, 0, 0, 0.04);
               }
           }
           .active {
               color: rgba(0, 0, 0, 0.74);
               &:after {
                   content: '';
                   display: block;
                   padding-top: 16px;
                   margin-bottom: -16px;
                   border-bottom: 2px solid rgba(0, 0, 0, 0.74);
                   transition: all 0.2s;
               }
           }
       `;
