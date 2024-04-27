import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';


const Home = () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={12} className="text-center">
                    <h1 className='h1-sub' >Welcome to the Organizational Structure App</h1>
                    <p>This application helps you manage and visualize the hierarchical structure of your organization.</p>
                    <div className="mt-4">
                        <Link to="/add">
                            <Button variant="primary">Add New Employee</Button>
                        </Link>
                        {' '}
                        <Link to="/view">
                            <Button variant="success">View Hierarchy</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
