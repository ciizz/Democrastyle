import React, { useState } from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import PremadeStyle from '../Components/PremadeStyle';
import FileUpload from '../Components/FileUpload';

function StyleTransfer() {
  const [contentImage, setContentImage] = useState(null);
  const [contentImageName, setContentImageName] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [styleImageName, setStyleImageName] = useState(null);
  const isSubmitDisabled = contentImage === '' || styleImage === '' || contentImage === null || styleImage === null;

  const handleContentImageUpload = (event) => {
    const file = event.target.files[0];
    const name = file.name;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setContentImage(imageUrl);
      setContentImageName(name);
    }
  };

  const handleStyleImageUpload = (event) => {
    const file = event.target.files[0];
    const name = file.name;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStyleImage(imageUrl);
      setStyleImageName(name);
    }
  };

  const handleGenerateStyleTransfer = (contentImage, styleImage, user) => {
    // Redirect to result page with message prop, image will start generating once rerouted there
    window.location.href = "/Result?contentImage=" + contentImage + "&styleImage=" + styleImage + "&contentImageName=" + contentImageName + "&styleImageName=" + styleImageName + "&user=" + user;
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
                    <FileUpload onChange={handleContentImageUpload} />
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
                    <FileUpload onChange={handleStyleImageUpload} />
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
        <Row style={{ marginTop: '40px' }}>
          <Col>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Link>
              <Button 
              variant="primary" 
              onClick={e => handleGenerateStyleTransfer(contentImage, styleImage, "ciz")}
              disabled={isSubmitDisabled}
              >
                Generate Style Transfer
              </Button>
            </Link>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StyleTransfer;
