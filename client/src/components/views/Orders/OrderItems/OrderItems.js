import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import slug from 'slug';
import formatMoney from '../../../../utils/formatMoney';

const OrderItemsStyles = styled.ul`
    li {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-gap: 1rem;
        font-size: 1rem;
        padding: 1rem;

        img {
            margin-right: 1rem;
        }

        a {
            color: ${(props) => props.theme.colors.valueBlack};
            &:hover {
                text-decoration: underline;
            }

        }
        span {
            font-size: 1.2rem;
        }
    }
`;

const OrderItems = ({orderItems}) => {
    return (
        <OrderItemsStyles>
            {orderItems.map(orderItem => {
                return (
                    <li key={orderItem.id}>
                        <img
                            src={orderItem.product.image}
                            width={150}
                            height={150}
                        />
                        <Link
                            href={`/product/${slug(
                                orderItem.product.name
                            )}?id=${orderItem.product.id}`}
                        >
                            <a>{orderItem.product.name}</a>
                        </Link>
                        <span>
                            {formatMoney(orderItem.product.price)}
                        </span>
                    </li>
                );

            })}
        </OrderItemsStyles>
    )
}

export default OrderItems;