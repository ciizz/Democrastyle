import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
            <Container>
                <Navbar.Brand href="/Home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Explore">Explore</Nav.Link>
                        <Nav.Link href="/StyleTransfer">Style Transfer</Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            {/* TODO: navigate to the current user's profile page */}
                            <NavDropdown.Item href="/Profile">Visit Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {/* TODO: Implement logout and link to here */}
                            <NavDropdown.Item href="#SIGNOUT">Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
