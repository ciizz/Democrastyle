import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APIService from '../Middleware/APIService';

import { getImageSize } from 'react-image-size';
import PhotoAlbum from "react-photo-album";


function Explore() {
  let navigate = useNavigate();

  const [stylizedImages, setStylizedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImageSize(image) {
      try {
        const dims = await getImageSize(image.url);
        return { ...image, ...dims, src: image.url };
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchStylizedImages() {
      try {
        const images = await APIService.getAllStylizedImages();
        const sizedImages = await Promise.all(images.map(i => fetchImageSize(i)));
        setStylizedImages(sizedImages);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStylizedImages();
  }, []);

  return (
    <>
      <Container>
        <Container className="mt-5 d-flex flex-column align-items-center">
          <h1>Explore Stylized Images</h1>
          <p>Click on an image to visit user profile.</p>
          {loading &&
            <Container className="mt-5 d-flex flex-column align-items-center">
              <h1>Loading images...</h1>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          }
          {!loading && stylizedImages.length === 0 &&
            <p>No stylized images found.</p>
          }
        </Container>

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
          onClick={({ photo }) => navigate(`/profile/${photo.user}`)}
        />
      </Container>
    </>
  );
}

export default Explore;
