import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import slug from 'slug';
import Link from 'next/link'
import formatMoney from '../utils/formatMoney';

const ProductGridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
    grid-gap: 10px;
`;

const Product = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    cursor: pointer;
    border: none;

    font-size: 1rem;

    img {
        align-self: center;
    }

    &:hover {
        border: 1px solid ${(props) => props.theme.colors.lightGrey};
        border-bottom: 3px solid ${(props) => props.theme.colors.primaryBlue};
    }

    p {
        align-self: center;
        &:hover {
            text-decoration: underline;
        }

        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    section {
        font-size: 1.5rem;
        color: ${(props) => props.theme.colors.black};
        .product_price {
            font-size: 1rem;
            text-decoration: line-through;
        }

        .product_discountPrice {
            color: ${(props) => props.theme.colors.red};
            margin-right: 0.5rem;
        }
    }

    .product_review {
        margin: 0.5rem 0;
    }

    .product_review--stars {
        margin-right: 0.2rem;
    }
`;


const ProductGrid = ({products}) => {
    return (
        <ProductGridStyles>
                {products.map((product) => {
                    const productNameSlug = slug(product.name);
                    const productReviewStarts = Math.floor(
                        parseFloat(product.averageRating)
                    );
                    return (
                        <Link
                            key={product.id}
                            href={{
                                pathname: `/product/${productNameSlug}`,
                                query: {
                                    id: product.id
                                }
                            }}
                        >
                            <Product>
                                <img
                                    src={product.image}
                                    className="product_image"
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                />
                                <p>{product.name}</p>
                                {product.reviewsCount && (
                                    <div className="product_review">
                                        <span className="product_review--stars">
                                            {'★'.repeat(productReviewStarts)}
                                            {'☆'.repeat(
                                                5 - productReviewStarts
                                            )}
                                        </span>
                                        <span>({product.reviewsCount})</span>
                                    </div>
                                )}
                                <section>
                                    {product.price ? (
                                        <>
                                            <span className="product_discountPrice">
                                                {formatMoney(product.price)}
                                            </span>
                                            <span className="product_price">
                                                {formatMoney(product.price)}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span>
                                                {formatMoney(product.price)}
                                            </span>
                                        </>
                                    )}
                                </section>
                            </Product>
                        </Link>
                    );
                })}
        </ProductGridStyles>
    );
}

export default ProductGrid;