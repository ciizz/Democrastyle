import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, Redirect } from 'react-router-dom';
import NavBar from '../Components/NavBar';

function Result() {
    const location = useLocation();
    const imageUrl = new URLSearchParams(location.search).get("imageurl");

    // TODO: ADDITION add logic to make the page render only if imageUrl belongs to the user?
    if (!imageUrl) {
        // Redirect to NotFound page if imageUrl is not valid
        return <Redirect to="/NotFound" />;
    }

    return (
        <Container>
        <NavBar />
        <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>This is Result</h1>
            <div className="mt-3">
            <p>The image URL is: {imageUrl}</p>
            </div>
        </Container>  
        </Container>
    );
}

export default Result;
