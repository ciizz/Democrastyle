import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import APIService from '../Middleware/APIService';
import Chart from 'chart.js/auto';

function Home() {
  const [requestCount, setRequestCount] = useState(null);
  const { currentUser } = useAuth();
  const chartRef = useRef();

  useEffect(() => {
    async function fetchRequestCount() {
      const response = await APIService.getRequestCounts();
      setRequestCount(response);
    }
    fetchRequestCount();
  }, []);

  const totalRequests = requestCount
  ? Object.values(requestCount).reduce((total, count) => total + count, 0)
  : 0;

  useEffect(() => {
    if (requestCount) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(requestCount),
          datasets: [
            {
              data: Object.values(requestCount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    }
  }, [requestCount]);

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
      <section className="text-center my-5" style={{ fontStyle: 'italic', color: 'gray' }}>
        <h2>Requests Summary</h2>
        <p>Total number of requests Requests: {totalRequests}</p>
        <p>Number of requests per country:</p>
        <canvas ref={chartRef} width="400" height="400"></canvas>
      </section>
    </Container>
  );
}
export default Home;