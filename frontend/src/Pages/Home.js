import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../Components/NavBar';

function Home() {
  return (
    <Container>
        <NavBar />
        <h1>This is Home</h1>
    </Container>
  );
}

export default Home;