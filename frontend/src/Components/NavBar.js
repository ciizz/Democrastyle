import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // import useHistory

const NavBar = () => {

    const { currentUser } = useAuth();

    const { logout } = useAuth(); // import logout function from AuthContext

    const navigate = useNavigate(); // initialize useHistory

    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to sign out?");
        if (confirmed) {
            try {
                await logout();
                navigate('/Login'); // redirect to Home page on successful logout
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
            <Container>
                <Navbar.Brand href="/Home">Democrastyle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Explore">Explore</Nav.Link>
                        <Nav.Link href="/StyleTransfer">Style Transfer</Nav.Link>
                        {currentUser ?
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/Profile">Visit My Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
                            </NavDropdown> :
                            <Nav.Link href="/Login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
