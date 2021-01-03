import React from 'React';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

const ReviewCardContainer = styled.div`
  padding: 1rem 1rem 1rem 2rem;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  box-shadow: ${(props) => props.theme.boxShadow};
  width: 100%;
  margin-bottom: 1rem;
`;

const ReviewHeroSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;

    h4 {
        font-size: 1.1rem;
        margin: 0;
    }
`;

const ReviewRating = styled.div`
    display:flex;
    align-items: center;
  color: #ffbf00;
  font-size: 1rem;
  margin: 0.5rem 0;
  margin-right: 1rem;
  `;

const ReviewAuthor = styled.div`
    display: flex;
    align-items: center;

    span {
        font-size: 0.9rem;
    }
  `;

const UserWithNoAvatar = styled(FaUserCircle)`
    font-size: 2rem;
    fill: ${(props) => props.theme.colors.secondaryGrey};
    margin-right: 1rem;
  `;

const ReviewDescription = styled.p`
    font-size: 1rem;
    line-height: 20px;
`;

const ReviewCard = ({ review }) => (
  <ReviewCardContainer>
    <ReviewAuthor>
      <UserWithNoAvatar />
      <span>{review.author}</span>
    </ReviewAuthor>
    <ReviewHeroSection>
      <ReviewRating>
        {'★'.repeat(review.rating)}

        {'☆'.repeat(5 - review.rating)}
      </ReviewRating>
      <h4>{review.title}</h4>
    </ReviewHeroSection>

    <ReviewDescription>{review.description}</ReviewDescription>
  </ReviewCardContainer>
);

export default ReviewCard;
