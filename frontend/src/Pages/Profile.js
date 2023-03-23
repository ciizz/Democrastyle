import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Image, Button, Modal, Form } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import { useParams } from 'react-router-dom';
import APIService from '../Middleware/APIService';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await APIService.getUserByUsername(username);
        setUser(user);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setProfilePicture(user.profilePicture);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [username]);

  const handleSave = async () => {
    try {
      // TODO: pass arguments and update user
      const updatedUser = { ...user, firstName, lastName, profilePicture };
      await APIService.updateUser(username, email, firstName, lastName, profilePicture);
      setUser(updatedUser);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setProfilePicture(user.profilePicture);
    setShowModal(false);
  };

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
                <Button className="mt-2" onClick={() => setShowModal(true)}>Edit</Button>
              </Col>
              <Col sm={8}>
                <h1>{user.firstName} {user.lastName}</h1>
                <h3>@{user.username}</h3>
                <p>{user.email}</p>
              </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formProfilePicture">
                    <Form.Label>Profile Picture URL</Form.Label>
                    <Form.Control type="text" value={profilePicture} onChange={(event) => setProfilePicture(event.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save changes</Button>
              </Modal.Footer>
            </Modal>
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
