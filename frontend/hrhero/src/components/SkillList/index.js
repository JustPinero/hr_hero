import React from 'react'
import { Star } from 'react-bootstrap-icons';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SkillList = (props)=>{
    return(
        <Container>
                {props.skills.map((skill)=>{
                    return(
                        <Col>
                            <Row>
                                <Star/>
                                <h3>
                                    {skill}
                                </h3>
                            </Row>
                        </Col>
                    )
                })}
        </Container>

    )
};
export default SkillList;