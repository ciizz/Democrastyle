import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../Contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom'; // import useHistory

import logo from "../assets/democrastyle-logo.png"
import { NavItem } from 'react-bootstrap';

const NavBar = () => {

    const { currentUser } = useAuth();

    const { logout } = useAuth(); // import logout function from AuthContext

    const navigate = useNavigate(); // initialize useHistory

    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to sign out?");
        if (confirmed) {
            try {
                await logout();
                navigate('/login'); // redirect to Home page on successful logout
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <Navbar bg="light" expand="lg" style={{ marginBottom: '20px' }}>
            <Container>
                <Navbar.Brand href="/">
                    {/* Democrastyle */}
                    <img
                        style={{ margin: "-25px 0 0 0", height: "60px" }}
                        src={logo}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavItem>
                            <NavLink exact to="/explore" className="nav-link" activeClassName="active">Explore</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to="/style-transfer" className="nav-link" activeClassName="active">Style Transfer</NavLink>
                        </NavItem>
                        {currentUser ?
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavItem>
                                    <NavLink exact to="/profile" className="nav-link" activeClassName="active">Visit My Profile</NavLink>
                                </NavItem>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
                            </NavDropdown> :
                            <NavItem>
                                <NavLink exact to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                            </NavItem>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
