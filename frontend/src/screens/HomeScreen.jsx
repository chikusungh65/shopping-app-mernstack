import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap';
import ProductScreen from './ProductScreen';
import Loader from '../Components/shared/Loader';
import Message from '../Components/shared/Message';
import Slider from '../Components/shared/Slider';
import Categories from '../Components/shared/Categories';
const HomeScreen = () => {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            {
                loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
                    <Row>
                        <Slider />
                        <Categories />
                        {
                            products.map(product => (
                                <Col key={product._id} md={3}>
                                    <ProductScreen product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                )}
        </>
    )
}

export default HomeScreen;