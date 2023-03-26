import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Image, Button, Modal, Form } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import APIService from '../Middleware/APIService';
import { useAuth } from '../Contexts/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const username = currentUser.displayName;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [stylizedImages, setStylizedImages] = useState([]);

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

    async function fetchStylizedImages() {
      try {
        const images = await APIService.getStylizedImagesByUser(username);
        setStylizedImages(images);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
    fetchStylizedImages();
  }, [username]);

  const handleSave = async () => {
    try {
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
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicProfilePicture">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="text" placeholder="Enter profile picture URL" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <h2>Stylized Images</h2>
        {stylizedImages.length > 0 ? (
          <Row>
            {stylizedImages.map((image, index) => (
              <Col key={index} sm={4}>
                <Image src={image.url} fluid className="image-container" />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No stylized images found.</p>
        )}
      </Container>
    ) : (
      <Container className="mt-5 d-flex flex-column align-items-center">
        <h1>User not found.</h1>
      </Container>
    )}
  </Container>
</Container>
);
}

export default Profile;