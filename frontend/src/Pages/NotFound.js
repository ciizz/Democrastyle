import React from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from '../Components/NavBar';

function NotFound() {
  return (
    <Container>
        <NavBar />  
        <div className="text-center">
            <h1>Oops! You seem to be lost.</h1>
            <p>Use the Navigation Bar to get back to the platform!</p>
        </div>
    </Container>
  );
}

export default NotFound;