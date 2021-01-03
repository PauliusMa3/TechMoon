import React from 'react';
import styled from 'styled-components';
import {useQuery} from '@apollo/react-hooks';
import {gql} from '@apollo/client'
import ErrorBanner from '../components/ErrorBanner';
import Loading from '../components/Loading/Loading';
import formatMoney from '../utils/formatMoney';
import OrderItems from '../components/OrderItems';

const GET_ORDERS = gql`
    query GET_ORDERS ($limit: Int, $offset: Int) {
        orders (limit: $limit, offset: $offset){
            id
            amount
            createdAt
            orderItems {
                id
                productId
                orderId
                product {
                    id
                    name
                    price
                    image
                }
            }
        }
    }
`;

const OrderPageStyles = styled.section`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    max-width: 1000px;
    margin: 0 auto;

    h2 {
        font-size: 2rem;
        
    }
`

const OrderCard = styled.div`
    box-shadow: ${props => props.theme.boxShadow};
`;

const OrderHeader = styled.div`
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 700;
    padding: 1rem;
    background: ${props => props.theme.colors.lightGrey};
`;

const OrderDetails = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-evenly;
    .order-details {
        display: flex;
        span {
            color: ${(props) => props.theme.colors.labelGrey};
            margin-right: 0.5rem;
        }

        div {
            color: ${(props) => props.theme.colors.valueBlack};
        }
    }
`;

const OrdersPage = () => {
    const {data, loading, error} = useQuery(GET_ORDERS, {
        variables: {
            limit: 10,
            offset: 0
        }
    });

    if(error) {
        return <ErrorBanner error={error.message} />
    }

    if(loading) {
        return <Loading />
    }

    return (
        <OrderPageStyles>
            <h2>My Orders</h2>
            {data.orders.map(order => {
                return (
                    <OrderCard key={order.id}>
                        <OrderHeader>
                            <div className="order-info">
                                <span>Order ID: </span>
                                <span>{order.id}</span>
                            </div>
                            <OrderDetails>
                                <div className="order-details">
                                    <span>Item</span>
                                    <div>{order.orderItems.length}</div>
                                </div>
                                <div className="order-details">
                                    <span>Total</span>
                                    <div>{formatMoney(order.amount)}</div>
                                </div>
                            </OrderDetails>
                        </OrderHeader>
                        <OrderItems orderItems = {order.orderItems}/>
                    </OrderCard>
                );
            })}

        </OrderPageStyles>
    )
}


export default OrdersPage