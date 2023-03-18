import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';

function Inference() {
  const [isContentImageUploaded, setIsContentImageUploaded] = useState(false);
  const [isStyleImageUploaded, setIsStyleImageUploaded] = useState(false);

  const handleContentImageUpload = () => {
    // TODO: Implement functionality for uploading content image
    setIsContentImageUploaded(true);
  };

  const handleStyleImageUpload = () => {
    // TODO: Implement functionality for uploading style image
    setIsStyleImageUploaded(true);
  };

  const handleGenerateStyleTransfer = () => {
    // TODO: Implement functionality for generating style transfer
    const imageurl = "Style transfer generated successfully.";
    // Redirect to result page with message prop
    window.location.href = "/Result?imageurl=" + encodeURIComponent(imageurl);
  };

  return (
    <Container>
      <NavBar />
      <Container className="mt-5 d-flex flex-column align-items-center">
        <h1>This is Inference</h1>
        <div className="mt-3">
          <Button variant="primary" onClick={handleContentImageUpload}>
            Upload Content Image
          </Button>
        </div>
        {isContentImageUploaded && (
          <div className="mt-3">
            <Button variant="primary" onClick={handleStyleImageUpload}>
              Upload Style Image
            </Button>
          </div>
        )}
        {isStyleImageUploaded && (
          <div className="mt-3">
            <Link>
              <Button variant="primary" onClick={handleGenerateStyleTransfer}>
                Generate Style Transfer
              </Button>
            </Link>
          </div>
        )}
      </Container>  
    </Container>
  );
}

export default Inference;
