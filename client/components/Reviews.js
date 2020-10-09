import React from "react";
import styled from "styled-components";
import ReviewCard from './ReviewCard';
import ReviewForm from './reviewForm';
import {useAuth} from '../src/auth-context';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from './Loading';

const ReviewContainer = styled.div`
  padding: 0.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const FETCH_REVIEWS_QUERY = gql`
  query FETCH_REVIEWS_QEURY($productId: ID!) {
    reviews(productId: $productId) {
      id
      title
      description
      rating
      author
      createdAt
    }
  }
`;

const ReviewStats=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 3rem 0;

    strong {
        font-size: 2.5rem;
        font-family: 'mont-bold';
    }

    p {
        font-size: 0.7rem;
        color: ${props => props.theme.colors.secondaryGrey};
    }
`

const ReviewLabel = styled.span`
    font-family: 'Mont-bold';
    font-size: 1.2rem;
`
const Star = styled.div`
  color: #ffbf00;
  font-size: 1rem;
  padding: 0.5rem;
`;
const ReviewAverageStars =styled.div`
    display: flex;
`
const Reviews = ({productId, reviewsCount}) => {

  const {isAuthenticated} = useAuth();

  const {data, loading, error}= useQuery(FETCH_REVIEWS_QUERY, {
    variables: {
      productId: productId
    }
  });
  
    const numberOfFullStars = `★`.repeat(1).split("");
    const numberOfEmptyStars = `☆`.repeat(4).split("");

    return (
      <ReviewContainer>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ReviewStats>
              <ReviewLabel>Reviews</ReviewLabel>
              <strong>4.0</strong>
              <ReviewAverageStars>
                {numberOfFullStars.map((star) => (
                  <Star>{star}</Star>
                ))}
                {numberOfEmptyStars.map((star) => (
                  <Star>{star}</Star>
                ))}
              </ReviewAverageStars>
              <p>{`based on ${reviewsCount} review${
                reviewsCount === 1 ? "" : "s"
              }`}</p>
            </ReviewStats>
            {isAuthenticated && <ReviewForm productId={productId} />}
            {!loading &&
              data.reviews.map((review) => <ReviewCard review={review} />)}
          </>
        )}
      </ReviewContainer>
    );
};

export default Reviews;
