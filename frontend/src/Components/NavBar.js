import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../Contexts/AuthContext';

const NavBar = () => {
    
    const { currentUser } = useAuth();

    return (
        <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
            <Container>
                <Navbar.Brand href="/Home">Democrastyle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Explore">Explore</Nav.Link>
                        <Nav.Link href="/StyleTransfer">Style Transfer</Nav.Link>
                        { currentUser ?
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Profile">Visit My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/Logout">Sign out</NavDropdown.Item>
                        </NavDropdown> :
                        <Nav.Link href="/Login">Login</Nav.Link> }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
