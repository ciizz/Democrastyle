import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom';

function Profile() {
  const { username } = useParams();

  return (
    <Container>
      <NavBar />
      <h1>This is Profile: {`${username}`}</h1>
    </Container>
  );
}

export default Profile;