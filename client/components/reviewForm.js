import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { ReviewFormStyles } from './styles/ReviewFormStyles';
import { FETCH_REVIEWS_QUERY } from './Reviews';

const InputField = styled.input`
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const CREATE_REVIEW_MUTATION = gql`
    mutation CREATE_REVIEW_MUTATION($title: String!, $description: String!, $rating: Int! $productId: Int!){
        createReview(title: $title, description: $description, rating: $rating, productId: $productId ){
            message
        }
    }
`;

const ReviewForm = ({ productId }) => {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const [fetchReviews] = useLazyQuery(FETCH_REVIEWS_QUERY);

  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW_MUTATION, {
    onCompleted: async () => {
      await fetchReviews({
        variables: {
          productId,
        },
      });
    },
  });

  return (
    <ReviewFormStyles
      onSubmit={async (e) => {
        e.preventDefault();

        const productIdInt = parseInt(productId);

        await createReview({
          variables: {
            title: reviewTitle,
            description: reviewDescription,
            productId: productIdInt,
            rating: parseInt(reviewRating),
          },
        });

        setReviewDescription('');
        setReviewTitle('');
        setReviewRating(0);

        await fetchReviews({
          variables: {
            productId,
          },
        });
      }}
    >
      <h2>Leave you Review</h2>
      <fieldset disabled={loading}>
        <InputField
          type="text"
          placeHolder="Tell everyone your experience with the product"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeHolder="Review the Product"
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
        />

        <div className="review-meta">
          <span>Please Rate Your Product</span>
          <div className="review__stars">
            <input
              type="radio"
              id="star1"
              name="rating"
              value={5}
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <label htmlFor="star1" />
            <input
              type="radio"
              id="star2"
              name="rating"
              value={4}
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <label htmlFor="star2" />
            <input
              type="radio"
              id="star3"
              name="rating"
              value={3}
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <label htmlFor="star3" />
            <input
              type="radio"
              id="star4"
              name="rating"
              value={2}
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <label htmlFor="star4" />
            <input
              type="radio"
              id="star5"
              name="rating"
              value={1}
              onChange={(e) => setReviewRating(e.target.value)}
            />
            <label htmlFor="star5" />
          </div>
        </div>
        <button type="submit">Submit Review</button>
      </fieldset>
    </ReviewFormStyles>
  );
};

export default ReviewForm;
