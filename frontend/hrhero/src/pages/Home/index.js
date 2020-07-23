import React from 'react';
import "./index.css";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EmployeeFilter from "../../components/Filter";
import Deck from "../../components/Deck";

const Home = () => {
    
    return(
        <Container id="homepage-container" fluid>
            <Row>
                <Col>
                    <EmployeeFilter/>
                    <Deck/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;