import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom';
import APIService from '../Middleware/APIService';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await APIService.getUserByUsername(username);
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [username]);

  return (
    <Container>
      <NavBar />
      <Container className="d-flex flex-column align-items-center">
        {loading ? (
          <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>Loading user...</h1>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        ) : user ? (
          <Container className="mt-5 d-flex flex-column align-items-center">
            <Row>
              <Col sm={4}>
                <Image src={user.profilePicture} roundedCircle fluid />
              </Col>
              <Col sm={8}>
                <h1>{user.firstName} {user.lastName}</h1>
                <h3>@{user.username}</h3>
                <p>{user.email}</p>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>User not found</h1>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default Profile;
