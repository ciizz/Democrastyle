import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import APIService from '../Middleware/APIService';

function Explore() {
  const [stylizedImages, setStylizedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStylizedImages() {
      try {
        const images = await APIService.getAllStylizedImages();
        setStylizedImages(images);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStylizedImages();
  }, []);

  return (
    <Container>
      <NavBar />
      <Container className="mt-5 d-flex flex-column align-items-center">
        <h1>Explore Stylized Images</h1>
        <p>Click on an image to visit user profile.</p>
        {loading ? (
          <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>Loading images...</h1>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        ) : stylizedImages.length > 0 ? (
          <Row>
            {stylizedImages.map((image, index) => (
              <Col key={index} sm={4} className="mb-3">
                <Link to={`/Profile/${image.user}`}>
                  <Image src={image.url} fluid className="image-container" />
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No stylized images found.</p>
        )}
      </Container>
    </Container>
  );
}

export default Explore;
