import React, { useState } from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import PremadeStyle from '../Components/PremadeStyle';
import FileUpload from '../Components/FileUpload';

function StyleTransfer() {
  const history = useHistory();
  const [contentImage, setContentImage] = useState(null);
  const [contentImageName, setContentImageName] = useState(null);
  const [contentImageURL, setContentImageURL] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [styleImageName, setStyleImageName] = useState(null);
  const [styleImageURL, setStyleImageURL] = useState(null);
  const isSubmitDisabled = contentImage === '' || styleImage === '' || contentImage === null || styleImage === null;

  const handleContentImageUpload = (event) => {
    const file = event.target.files[0];
    const name = file.name;
    if (file) {
      setContentImage(file);
      setContentImageName(name);
      setContentImageURL(URL.createObjectURL(file));
    }
  };

  const handleStyleImageUpload = (event) => {
    const file = event.target.files[0];
    const name = file.name;
    if (file) {
      setStyleImage(file);
      setStyleImageName(name);
      setStyleImageURL(URL.createObjectURL(file));
    }
  };

  const handleGenerateStyleTransfer = () => {
    // Redirect to result page with message prop, image will start generating once rerouted there
    // window.location.href = "/Result?contentImage=" + contentImage + "&styleImage=" + styleImage + "&contentImageName=" + contentImageName + "&styleImageName=" + styleImageName + "&user=" + user;
    history.go('/Result', { contentImage: contentImage, styleImage: styleImage, contentImageName: contentImageName, styleImageName: styleImageName });
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
                    {contentImageURL && (<Image style={{ height: '200px' }} src={contentImageURL} fluid />)}
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
                    {styleImageURL && (<Image style={{ height: '200px' }} src={styleImageURL} fluid />)}
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
            {/* <Router> */}
              {/* <Link to={{
                pathname: "/Result", 
                state: {
                  contentImage: contentImage,
                  styleImage: styleImage, 
                  contentImageName: contentImageName,
                  syleImageName: styleImageName,
                  user: "ciz"
                }
              }}> */}
                <Button 
                variant="primary" 
                onClick={handleGenerateStyleTransfer}
                disabled={isSubmitDisabled}
                >
                  Generate Style Transfer
                </Button>
              {/* </Link> */}
            {/* </Router> */}
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StyleTransfer;
