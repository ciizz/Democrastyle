import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Container, Card, Row, Col, Image, Button, Collapse, Spinner } from 'react-bootstrap';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import PremadeStyle from '../Components/PremadeStyle';
import FileUpload from '../Components/FileUpload';
import APIService from '../Middleware/APIService';


function StyleTransfer() {
  const { currentUser } = useAuth();
  const [contentImage, setContentImage] = useState(null);
  const [contentImageName, setContentImageName] = useState(null);
  const [contentImageURL, setContentImageURL] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [styleImageName, setStyleImageName] = useState(null);
  const [styleImageURL, setStyleImageURL] = useState(null);
  const [premadeStyles, setPremadeStyles] = useState([]);
  const [premadeStylesVisible, setPremadeStylesVisible] = useState(false);
  const [premadeStylesLoading, setPremadeStylesLoading] = useState(true);
  const isSubmitDisabled = contentImage === '' || styleImage === '' || contentImage === null || styleImage === null;

  useEffect(() => {
    setPremadeStylesLoading(true);    
    const getPremadeStyles = async () => {
      try {
        const styles = await APIService.getPremadeStyles();
        setPremadeStyles(styles);
        setPremadeStylesLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getPremadeStyles();
  }, []);

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

  const handlePremadeStyleClick = async (style) => {
    setStyleImageName(style.filename);
    setStyleImageURL(style.url);
    const response = await fetch(style.url);
    const blob = await response.blob();
    const file = new File([blob], style.filename, { type : 'image/jpeg' });
    setStyleImage(file);
  }

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
                  <Button
                    onClick={() => setPremadeStylesVisible(!premadeStylesVisible)}
                    aria-controls="collapse-styles"
                    aria-expanded={premadeStylesVisible}
                    variant="outline-primary"
                  >
                    Or choose from our premade styles {premadeStylesVisible ? <FaChevronUp className="float-right" /> : <FaChevronDown className="float-right" />}
                  </Button>
                  </Card.Text>
                  <Collapse in={premadeStylesVisible}>
                    { premadeStylesLoading ?
                    <div id="collapse-styles">
                      <Row>
                        <Col>
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </Col>
                      </Row>
                    </div> :
                    <div id="collapse-styles">
                      <Row>
                        <Col>
                          <PremadeStyle onSelect={() => handlePremadeStyleClick(premadeStyles[0])} title={premadeStyles[0].filename} image={premadeStyles[0].url}/>
                        </Col>
                        <Col>
                          <PremadeStyle onSelect={() => handlePremadeStyleClick(premadeStyles[1])} title={premadeStyles[1].filename} image={premadeStyles[1].url}/>
                        </Col>
                        <Col>
                          <PremadeStyle onSelect={() => handlePremadeStyleClick(premadeStyles[2])} title={premadeStyles[2].filename} image={premadeStyles[2].url}/>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <PremadeStyle onSelect={() => handlePremadeStyleClick(premadeStyles[3])} title={premadeStyles[3].filename} image={premadeStyles[3].url}/>
                        </Col>
                        <Col>
                          <PremadeStyle onSelect={() => handlePremadeStyleClick(premadeStyles[4])} title={premadeStyles[4].filename} image={premadeStyles[4].url}/>
                        </Col>
                        <Col>
                          <PremadeStyle onSelect={() => handlePremadeStyleClick(premadeStyles[5])} title={premadeStyles[5].filename} image={premadeStyles[5].url}/>
                        </Col>
                      </Row>
                    </div> }
                  </Collapse>
                </Card.Body>
              </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '40px' }}>
          <Col>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <div
              style={{ pointerEvents: isSubmitDisabled ? 'none' : 'auto' }}
            >
              <Link 
              to="/Result" 
              state={{
                  contentImage: contentImage,
                  styleImage: styleImage,
                  contentImageName: contentImageName,
                  syleImageName: styleImageName,
                  user: currentUser.uid
                }}
              >
                <Button variant="primary" size="lg" disabled={isSubmitDisabled}>
                  Generate Style Transfer
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default StyleTransfer;
