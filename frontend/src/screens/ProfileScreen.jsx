import React, { useState, useEffect } from 'react';

import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/shared/Message';
import Loader from '../Components/shared/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { listMyOrders } from "../actions/orderAction";
import { LinkContainer } from "react-router-bootstrap";



const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [message, setMessage] = useState('');



    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const userLogin = useSelector((state) => state.userLogin);

    const { loading, error, user } = userDetails;
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')

        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders());
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch
        dispatch(updateUserProfile({ id: user._id, name, email, password }))

    };

    return (
        <>
            <Row>
                <Col md={3}>
                    <h1>Update Information</h1>
                    {error && <Message varient="danger">{error}</Message>}
                    {success && <Message variant="success">Profile Updated</Message>}
                    {loading && <Loader />}
                    {message && <Message variant="danger">{message}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Confirmpassword">
                            <Form.Label>confirmPassword</Form.Label>
                            <Form.Control type="Password" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="submit" varient="primary">
                            UPDATE
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h1>My Orders</h1>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>DATE</td>
                                    <td>TOTAL</td>
                                    <td>PAID</td>
                                    <td>DELIVERD</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelevered ? (
                                                order.deleveredAt
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: "red" }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant="light">Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen;