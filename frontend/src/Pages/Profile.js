import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Image, Button, Modal, Form, Alert, OverlayTrigger, Tooltip, Ratio } from 'react-bootstrap';
import APIService from '../Middleware/APIService';
import FileUpload from '../Components/FileUpload';
import { getImageSize } from 'react-image-size';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function Profile() {
  const navigate = useNavigate();

  const { currentUser, updateDisplayName, updateProfilePicture } = useAuth();

  const [userId, setUserId] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState('');
  const [stylizedImages, setStylizedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [showDisplayNameModal, setShowDisplayNameModal] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUserId(currentUser.uid);
        setDisplayName(currentUser.displayName);
        setProfilePicture(currentUser.photoURL);
        setLoading(false);
      }
    }

    async function fetchStylizedImages() {
      try {
        const images = await APIService.getStylizedImagesByUser(userId);
        const sizedImages = await Promise.all(images.map(async image => {
          try {
            const dims = await getImageSize(image.url);
            return { ...image, ...dims, src: image.url };
          } catch (error) {
            console.error(error);
          }
        }));

        setStylizedImages(sizedImages);
      } catch (error) {
        console.error(error);
      }
    }


    fetchUserProfile();
    fetchStylizedImages();
    setLoadingImages(false);
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
              <Col>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="edit-tooltip">Click to edit</Tooltip>}
                >
                  <div id="rest" style={{ width: 250, height: 'auto' }}>
                    <Ratio aspectRatio={"1x1"}>
                      <Image
                        style={{
                          objectFit: "cover", /* Do not scale the image */
                          objectPosition: "center", /* Center the image within the element */
                        }}
                        src={profilePicture}
                        roundedCircle
                        thumbnail
                        fluid
                        onClick={() => setShowProfilePicModal(true)}
                      />
                    </Ratio>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="edit-tooltip">Click to edit</Tooltip>}
                >
                  <div style={{ padding: "15px 0 0 0", width: "100%", display: "flex", justifyContent: "center" }}>
                    {/* eslint-disable-next-line */}
                    <a style={{ justifyContent: "center" }} href="#" onClick={() => setShowDisplayNameModal(true)}>
                      <h3 >@{displayName} </h3>
                    </a>
                  </div>
                </OverlayTrigger>
              </Col>
            </Row>
            <Modal show={showDisplayNameModal} onHide={() => { setShowDisplayNameModal(false); handleCancel() }}>
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
            <Modal show={showProfilePicModal} onHide={() => { setShowProfilePicModal(false); handleCancel() }}>
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
          </Container>
        ) : (
          <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>User not found.</h1>
          </Container>
        )}
      </Container>
      {!loading && currentUser &&
        <>
          <h2>Stylized Images</h2>
          {loadingImages &&
            <>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          }
          {!loadingImages && stylizedImages?.length > 0 &&
            <>
              <PhotoAlbum
                photos={stylizedImages}
                layout="columns"
                // columns={3}
                columns={(containerWidth) => {
                  if (containerWidth < 400) return 1;
                  if (containerWidth < 800) return 2;
                  if (containerWidth < 1400) return 3;
                  return 4;
                }}
                onClick={({ index }) => setLightboxIndex(index)}
              />
              <Lightbox
                slides={stylizedImages}
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen]}
              />
            </>
          }
          {!loadingImages && stylizedImages?.length === 0 &&
            <p>No stylized images found.</p>
          }
        </>
      }

    </Container >
  );
}

export default Profile;
