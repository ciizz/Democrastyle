import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

function Home() {

  const { currentUser } = useAuth();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <section className="text-center my-5">
        <h1 className="text-center mt-5">Democrastyle</h1>
      </section>
      <nav>
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="mx-3"><Button variant="primary" as={Link} to={"/StyleTransfer"}>Style Transfer</Button></li>
          <li className="mx-3"><Button variant="secondary" as={Link} to={"/Explore"}>Explore</Button></li>
          { currentUser ?
          <li className="mx-3"><Button variant="secondary" as={Link} to={"/Profile"}>Profile</Button></li> :
          <li className="mx-3"><Button variant="secondary" as={Link} to={"/Login"}>Login</Button></li> }
        </ul>
      </nav>
      <section className="text-center my-5" style={{ fontStyle: 'italic', color: 'gray' }}>
        <h2>About Us</h2>
        <p className="lead ">We are a group a students from McGill University. Our platform Democrastyle provides image Neural Style Transfer (NST) to its users. The aim is to democratize the use of machine learning tools, making them accessible to everyone, regardless of technical expertise. The platform is designed to provide high-quality style transfer tools for free, by leveraging performant pre-trained NST models. The motivation behind the platform is to contribute to making machine learning tools more accessible for everyday tasks. Additionally, the platform will foster an online community of users and artists.</p>
      </section>
    </Container>
  );
}

export default Home;
