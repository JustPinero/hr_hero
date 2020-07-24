import React, {useState} from 'react';

import "./index.css";
//Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
//Custom Components
import SkillList from "../SkillList";
import Portrait from '../Portrait';
import NavButton from '../../components/utils/NavButton'
//Actions
import { useStoreContext } from "../../utils/GlobalState";
import {REMOVE_EMPLOYEE, UPDATE_EMPLOYEE, UPDATING_EMPLOYEE} from "../../utils/actions"
import API from "../../utils/API";
import PowersList from '../NewEmployeeForm/PowersList';


const ProfileInfo = (props)=>{
    const [state, dispatch] = useStoreContext();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleUpdates= e => {
        if(e.target.name == 'skills'){
            if(e.target.checked){
                dispatch({ type: UPDATING_EMPLOYEE, update:{skills: [e.target.id, ...state.currentEmployee.skills]}})
            }else{
                dispatch({ type: UPDATING_EMPLOYEE, update:{skills: [...state.currentEmployee.skills.filter(skill=>{
                    return e.target.id!==skill})]}})
            }
            console.log("CURRENT EMPLOYEE", state.currentEmployee)
        }else{
        let field = e.target.name;
        dispatch({ type: UPDATING_EMPLOYEE, update:{[field]:e.target.value}})
        }
    }
    const updateEmployee= ()=>{
        API.updateEmployee(state.currentEmployee)
            .then((res) => {
                dispatch({
                    type:UPDATE_EMPLOYEE,
                    employee: res.data
                })
            });
    }
    const removeEmployee = ()=> {
        API.deleteEmployee(props.id)
            .then(()=> {
                dispatch({
                    type: REMOVE_EMPLOYEE,
                    id: props.id
                });
            })
            .catch(err=>console.log(err));
        };
    return (
        <Container id="profile-container" fluid>
            <NavButton buttonText="BACK" buttonStyle="back-button" navPath="/"/>
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
                  {state.currentEmployee.skills ? <SkillList skills={state.currentEmployee.skills}/> : <div/>}
               </Row>
                </Col>
            </Row>
            <Row id="profile-button__box">
                <Col >
                    <Button onClick={handleShow} className="profile-button" id="update-button" variant="primary" size="lg" block>
                    UPDATE
                    </Button>
                </Col>
                <Col>
                    <Button onClick={removeEmployee} className="profile-button" id="terminate-button" variant="danger" size="lg" block>
                        REMOVE
                    </Button>
                </Col>
            </Row>
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form id="form-container" onSubmit={updateEmployee}>
            <Form.Row>
                <Col md={3}>
                    <Image id="form-image" fluid style={{backgroundColor:"black"}} src={state.currentEmployee.portrait}/>
                    <Form.Control onChange={handleUpdates} name="portrait" value={state.currentEmployee.portrait} />
                </Col>
                <Col>
                <Form.Row>
                    <Col>
                        <Form.Control onChange={handleUpdates} name="title" value={state.currentEmployee.title} placeholder="Title" />
                    </Col>
                    <Col>
                        <Form.Control onChange={handleUpdates} name="firstName" value={state.currentEmployee.firstName} placeholder="First name" />
                    </Col>
                </Form.Row>
                <Form.Row>
                <Col>
                    <Form.Control onChange={handleUpdates} name="email" value={state.currentEmployee.email} placeholder="Email" />
                    </Col>
                    <Col>
                    <Form.Control onChange={handleUpdates} name="lastName" value={state.currentEmployee.lastName} placeholder="Last name" />
                </Col>
                
                </Form.Row>
                <Form.Row id="form-skillbox">
                {PowersList.map((power) => (
                    <Col xs={4} key={power}>
                    <Form.Check 
                        onChange={handleUpdates}
                        type={"checkbox"}
                        id={power}
                        label={power}
                        name="skills"
                        checked={state.currentEmployee.skills.includes(power)}  
                    />
                    
                    </Col>
                ))}
                </Form.Row>
                </Col>
            </Form.Row>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={updateEmployee} variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>
        </Container>
    )
};
export default ProfileInfo;
