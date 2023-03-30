import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import APIService from '../Middleware/APIService';

function Result() {
    const location = useLocation();
    const props = location.state;

    const contentImage = props.contentImage;
    const styleImage = props.styleImage;
    const contentImageName = props.contentImageName;
    const styleImageName = props.styleImageName;
    const user = props.user;
    const [stylizedImage, setStylizedImage] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        async function performStyleTransfer() {
            try {
                let res = await APIService.performStyleTransfer(contentImage, styleImage, contentImageName, styleImageName, user);
                setStylizedImage(res.imageURL);
            } catch (err) {
                setServerError(err);
                console.log(err);
            }
        }
        performStyleTransfer();
    }, [contentImage, styleImage, contentImageName, styleImageName, user]);

    return (
        <Container>
            <NavBar />
            <Container className="mt-5 d-flex flex-column align-items-center">
                <Row>
                    {   stylizedImage ?
                    <Col style={{ textAlign: "center" }}>
                        <h1>Here is your stylized image:</h1>
                        <Image src={stylizedImage} style={{ maxHeight: "500px", maxWidth: "500px" }} />
                    </Col> :
                    <Col style={{ textAlign: "center" }}>
                        { serverError ? 
                        <h2>There was an error generating your image. Please try again later.</h2> :
                        <div>
                            <h1>Generating image</h1>
                            <br/>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>  }
                    </Col>  }
                </Row>
            </Container>
        </Container>
    );
}

export default Result;
