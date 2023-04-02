import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Container, Card, Row, Col, Image, Button, Collapse, Spinner, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
  const [sampleMode, setSampleMode] = useState("scale");
  const [premadeStyles, setPremadeStyles] = useState([]);
  const [premadeStylesVisible, setPremadeStylesVisible] = useState(false);
  const [premadeStylesLoading, setPremadeStylesLoading] = useState(true);
  const [selectedStyleIdx, setSelectedStyleIdx] = useState(null);
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

  const handlePremadeStyleClick = async (styleIdx) => {
    setSelectedStyleIdx(styleIdx);
    const style = premadeStyles[styleIdx];
    setStyleImageName(style.filename);
    setStyleImageURL(style.url);
    const response = await fetch(style.url);
    const blob = await response.blob();
    const file = new File([blob], style.filename, { type: 'image/jpeg' });
    setStyleImage(file);
  }

  return (
    <Container>
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
                    {styleImageURL && (<Image style={{ height: '200px' }} src={styleImageURL} fluid />)}
                  </Col>
                </Row>
                <Row>
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
                    {premadeStylesLoading ?
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
                            <PremadeStyle onSelect={() => handlePremadeStyleClick(0)} isSelected={selectedStyleIdx === 0} title={premadeStyles[0].filename} image={premadeStyles[0].url} />
                          </Col>
                          <Col>
                            <PremadeStyle onSelect={() => handlePremadeStyleClick(1)} isSelected={selectedStyleIdx === 1} title={premadeStyles[1].filename} image={premadeStyles[1].url} />
                          </Col>
                          <Col>
                            <PremadeStyle onSelect={() => handlePremadeStyleClick(2)} isSelected={selectedStyleIdx === 2} title={premadeStyles[2].filename} image={premadeStyles[2].url} />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <PremadeStyle onSelect={() => handlePremadeStyleClick(3)} isSelected={selectedStyleIdx === 3} title={premadeStyles[3].filename} image={premadeStyles[3].url} />
                          </Col>
                          <Col>
                            <PremadeStyle onSelect={() => handlePremadeStyleClick(4)} isSelected={selectedStyleIdx === 4} title={premadeStyles[4].filename} image={premadeStyles[4].url} />
                          </Col>
                          <Col>
                            <PremadeStyle onSelect={() => handlePremadeStyleClick(5)} isSelected={selectedStyleIdx === 5} title={premadeStyles[5].filename} image={premadeStyles[5].url} />
                          </Col>
                        </Row>
                      </div>}
                  </Collapse>
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
                    <Card.Title>Sampling Method</Card.Title>
                    <Card.Text>Select to retain the fine details or general features of style image.</Card.Text>
                    <ToggleButtonGroup type="radio" name="sample-options" value={sampleMode} onChange={(mode) => setSampleMode(mode)}>
                      <ToggleButton id="tbg-btn-2" variant="outline-primary" value={"crop"}>
                        Fine Details
                      </ToggleButton>
                      <ToggleButton id="tbg-btn-1" variant="outline-primary" value={"scale"}>
                        General Features (recommended)
                      </ToggleButton>
                    </ToggleButtonGroup>
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
                  styleImageSize: 512,
                  sampleMode: sampleMode,
                  user: currentUser.uid,
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
