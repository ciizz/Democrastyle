import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import APIService from '../Middleware/APIService';

function Result() {

    const location = useLocation();
    const contentImage = new URLSearchParams(location.search).get("contentImage");
    const styleImage = new URLSearchParams(location.search).get("styleImage");
    const contentImageName = new URLSearchParams(location.search).get("contentImageName");
    const styleImageName = new URLSearchParams(location.search).get("styleImageName");
    const user = new URLSearchParams(location.search).get("user");
    const [stylizedImage, setStylizedImage] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        const contentImageBlob = new Blob([contentImage], { type: 'image/jpeg' });
        const styleImageBlob = new Blob([styleImage], { type: 'image/jpeg' });
        console.log(contentImage);
        async function performStyleTransfer() {
            try {
                let res = await APIService.performStyleTransfer(contentImageBlob, styleImageBlob, contentImageName, styleImageName, user);
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
                    <Col>
                        <h1>Here is your stylized image:</h1>
                        <div className="mt-3">
                        <p>The image URL is: </p>
                        </div>
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
