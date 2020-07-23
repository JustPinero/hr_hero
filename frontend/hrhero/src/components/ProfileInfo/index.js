import React from 'react';

import "./index.css";
//Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
//Custom Components
import SkillList from "../SkillList";
import Portrait from '../Portrait';


const ProfileInfo = (props)=>{
    console.log("PROPS", props)

    return (
        <Container id="profile-container" fluid>
            <Row>
            <Col md={5}>
                <Portrait portrait={props.portrait}/>
                <div id="title-banner">
                    <h1 id="title-banner__text"> {props.title}</h1>
                </div>
            </Col>
                <Col className="mt-auto"md={7}>
                    <Form id="info-container">
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                             Name:
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control plaintext readOnly defaultValue={props.firstName? props.firstName+ " "+ props.lastName:""} />
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="1">
                            Email
                            </Form.Label>
                            <Col sm="6">
                                <Form.Control plaintext readOnly defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>
                    
                    </Form>
                  <Row>
                  <SkillList skills={props.skills}/>
               </Row>
                </Col>
            </Row>
        </Container>
    )
};
export default ProfileInfo;
