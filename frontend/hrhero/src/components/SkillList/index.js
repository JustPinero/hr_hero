import React from 'react'
import "./index.css"
import { Star } from 'react-bootstrap-icons';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const SkillList = (props)=>{
    return(
        <Card id="skills-container">
            <Card.Header style={{textAlign:"center"}}>SPECIAL SKILLS</Card.Header>
            <ListGroup>
                {props.skills
                    ?

                    props.skills.map((skill, index)=>{
                    return(     
                                <ListGroup.Item id="skill-block" key={index}>
                                    <Star/> {skill}
                                </ListGroup.Item>
                    )
                }): <div></div>}
                </ListGroup>
        </Card>

    )
};
export default SkillList;