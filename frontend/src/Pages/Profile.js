



import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Image, Button, Modal, Form, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import APIService from '../Middleware/APIService';
import FileUpload from '../Components/FileUpload';

function Profile() {
  const navigate = useNavigate();

  const { currentUser, updateDisplayName, updateProfilePicture } = useAuth();

  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [stylizedImages, setStylizedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDisplayNameModal, setShowDisplayNameModal] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);

  useEffect(() => {

    async function fetchUserProfile() {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUserId(currentUser.uid);
        setDisplayName(currentUser.displayName);
        setEmail(currentUser.email);
        setProfilePicture(currentUser.photoURL);
        setLoading(false);
      }
    }

    async function fetchStylizedImages() {
      try {
        const images = await APIService.getStylizedImagesByUser(userId);
        setStylizedImages(images);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserProfile();
    fetchStylizedImages();
  }, [currentUser, userId, navigate]);

  const handleUpdateDisplayName = async () => {
    try {
      // check if displayName changed
      if (displayName !== currentUser.displayName) {
        const displayNameTaken = await APIService.isDisplayNameTaken(displayName);
        if (displayNameTaken) {
          <Alert variant='danger'>
            Display name already taken.
          </Alert>
        } else {
          console.log("updating display name");
          await updateDisplayName(displayName);
          setDisplayName(displayName);
        }
      }

      setShowDisplayNameModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setDisplayName(currentUser.displayName);
    setShowDisplayNameModal(false);
    setProfilePicture(currentUser.photoURL);
    setShowProfilePicModal(false);
  };

  const handleProfileImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const profilePic = await APIService.uploadUserProfilePic(userId, file);
        await updateProfilePicture(profilePic);
        setProfilePicture(profilePic);
        setShowProfilePicModal(false);
      }
    } catch (error) {
      console.error(error);
    }
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
        ) : currentUser ? (
        <Container className="mt-5 d-flex flex-column align-items-center">
          <Row>
            <Col sm={4}>
              {/* <Image src={profilePicture} roundedCircle fluid onClick={() => setShowProfilePicModal(true)} />
              <div variant="justify" className="mt-2" >Click to edit</div> */}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="edit-tooltip">Click to edit</Tooltip>}
              >
                <Image
                  src={profilePicture}
                  roundedCircle
                  fluid
                  onClick={() => setShowProfilePicModal(true)}
                />
              </OverlayTrigger>
            </Col>
            <Col sm={8}>
              <a href="#" onClick={() => setShowDisplayNameModal(true)}>
              <h3>@{displayName} </h3>
              </a>
            </Col>
          </Row>
          <Modal show={showDisplayNameModal} onHide={() => {setShowDisplayNameModal(false); handleCancel()}}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Display Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Update your profile information.</p>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button variant="primary" className="mt-2" onClick={handleUpdateDisplayName}>
                    Save
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal show={showProfilePicModal} onHide={() => {setShowProfilePicModal(false); handleCancel()}}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicProfilePicture">
                <FileUpload onChange={handleProfileImageUpload} />
              </Form.Group>
            </Form>
            </Modal.Body>
          </Modal>
          <h2>Stylized Images</h2>
          { stylizedImages && stylizedImages.length > 0 ? (
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
