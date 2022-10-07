import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { logout } from '../actions/userAction';

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <>
            <Navbar bg="success" expand="lg" variant='success' collapseOnSelect>
                <Container>

                    <LinkContainer to="/">
                        <Navbar.Brand>Black-Bull Garments/Accessories</Navbar.Brand>
                    </LinkContainer>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/Cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    &nbsp;  cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ) : (<LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i>
                                    &nbsp; signin</Nav.Link>
                            </LinkContainer>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header