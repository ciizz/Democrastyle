import React, { useState } from 'react';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import PremadeStyle from '../Components/PremadeStyle';
import FileUpload from '../Components/FileUpload';

function StyleTransfer() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);

  const handleContentImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setContentImage(imageUrl);
    }
  };

  const handleStyleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setStyleImage(imageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted form.");
  };

  return (
    <Container>
      <NavBar />
      <Container fluid="md">
        <Row style={{ marginBottom: '40px' }}>
          <Col>
            <h2>Style Transfer</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>Target Image</Card.Title>
                    <Card.Text>
                      Upload an image you which to style.
                    </Card.Text>
                    <FileUpload handleSubmit={handleSubmit} onChange={handleContentImageUpload} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {contentImage && (<Image style={{ height: '200px' }} src={contentImage} fluid />)}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
                <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>Style Image</Card.Title>
                    <Card.Text>
                      Upload an image to be used as the style.
                    </Card.Text>
                    <FileUpload handleSubmit={handleSubmit} onChange={handleStyleImageUpload} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {styleImage && (<Image style={{ height: '200px' }} src={styleImage} fluid />)}
                  </Col>
                </Row>
                  <Card.Text>
                    Or choose from one of the following premade styles:
                  </Card.Text>
                  <Row>
                    <Col>
                      <PremadeStyle onSelect={handleStyleImageUpload} title="Style 1" image="https://i.imgur.com/1ZQ3Q2M.jpg"/>
                    </Col>
                    <Col>
                      <PremadeStyle onSelect={handleStyleImageUpload} title="Style 2" image="https://i.imgur.com/1ZQ3Q2M.jpg"/>
                    </Col>
                    <Col>
                      <PremadeStyle onSelect={handleStyleImageUpload} title="Style 3" image="https://i.imgur.com/1ZQ3Q2M.jpg"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <PremadeStyle onSelect={handleStyleImageUpload} title="Style 4" image="https://i.imgur.com/1ZQ3Q2M.jpg"/>
                    </Col>
                    <Col>
                      <PremadeStyle onSelect={handleStyleImageUpload} title="Style 5" image="https://i.imgur.com/1ZQ3Q2M.jpg"/>
                    </Col>
                    <Col>
                      <PremadeStyle onSelect={handleStyleImageUpload} title="Style 6" image="https://i.imgur.com/1ZQ3Q2M.jpg"/>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StyleTransfer;
