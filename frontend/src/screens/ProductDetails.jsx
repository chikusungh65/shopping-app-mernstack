import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Rating from '../Components/Rating';
import { Row, Col, ListGroup, Button, Image, ListGroupItem, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProductDetails = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (

        <>
            <Link to="/" className="btn  btn-light">
                <i className="fas fa-arrow-left"></i>

                &nbsp;GO BACK</Link>
            <Row>
                <Col md={6} >
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price : ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroupItem>
                        <Row>
                            <Col>Status :</Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </Col>
                        </Row>
                    </ListGroupItem>
                    {
                        product.countInStock > 0 && (
                            <ListGroupItem>
                                <Col>Qty</Col>
                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {

                                        [...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </ListGroupItem>
                        )
                    }
                    <ListGroupItem>
                        <Button type="button" className="btn-block" onClick={addToCartHandler}>
                            Add to Cart
                        </Button>
                    </ListGroupItem>
                </Col>
            </Row>

        </>
    );
};

export default ProductDetails;