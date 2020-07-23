import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"

const ProfileInfo = (props)=>{
    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <h1>
                            {props.title}
                        </h1>
                    </Row>
                    <Row>
                        <Col>
                            <h1>
                                First Name: {props.firstName}
                            </h1>
                        </Col>
                        <Col>
                            <h1>
                                Last Name: {props.firstName}
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <h1>
                            {props.email}
                        </h1>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};
