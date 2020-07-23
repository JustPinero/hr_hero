import React, { useRef } from "react";
import "./index.css"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_EMPLOYEE, LOADING,ADD_SKILL,REMOVE_SKILL } from "../../utils/actions";
import API from "../../utils/API";
import PowersList from "./PowersList";
import QuestionMark from "../../assets/img/questionMark.png"

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

const NewEmployeeForm= ()=>{
    //HOOKS
    //Form References
    const titleRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const portraitRef = useRef();
    const skillsRef = useRef();
    //state
    const [state, dispatch] = useStoreContext();
    const handleSkillChange = e => {
        console.log("CHECKBOX NAME:", e.target.name, e.target.checked)
       
        if(e.target.checked){
            dispatch({type: ADD_SKILL, skill:e.target.name});
        }else{
            dispatch({type: REMOVE_SKILL, skill:e.target.name});
        }
        console.log(state.formSkills)
    }
    const handleSubmit = e =>{
        e.preventDefault();
        console.log("SKILLS FINAL DRAFT", state.formSkills)
        dispatch({type: LOADING});
        API.addEmployee({
            title: titleRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            portrait: portraitRef.current.value,
            skills: JSON.stringify(state.formSkills)
        })
        .then(result=>{
            dispatch({
                type:ADD_EMPLOYEE,
                employee:result.data
            });
        })
        .catch(err=>console.log(err));
            titleRef.current.value = "";
            firstNameRef.current.value = "";
            lastNameRef.current.value = "";
            emailRef.current.value = "";
            portraitRef.current.value = "";
            skillsRef.current.value = [];
    }
    return (
    <Form id="form-container" onSubmit={handleSubmit}>
        <Form.Row>
            <Col md={3}>
                <Image id="form-image" fluid style={{backgroundColor:"black"}} src={QuestionMark}/>
                <Form.Control ref={portraitRef}placeholder="Portrait URL" />
            </Col>
            <Col>
            <Form.Row>
                <Col>
                    <Form.Control ref={titleRef} placeholder="Title" />
                </Col>
                <Col>
                    <Form.Control ref={firstNameRef} placeholder="First name" />
                </Col>
            </Form.Row>
            <Form.Row>
            <Col>
                <Form.Control ref={emailRef} placeholder="Email" />
                </Col>
                <Col>
                <Form.Control ref={lastNameRef} placeholder="Last name" />
            </Col>
            
            </Form.Row>
            <Form.Row id="form-skillbox">
            {PowersList.map((power) => (
                <Col xs={4} key={power}>
                <Form.Check 
                    onChange={handleSkillChange}
                    type={"checkbox"}
                    id={power}
                    label={power}
                    ref={skillsRef}
                    name={power}    
                />
                
                </Col>
            ))}
            </Form.Row>
            </Col>
        </Form.Row>
        <Form.Row className="justify-content-md-center"> 
                <Button type="submit" id='submit-button' variant="primary" size="lg" block>
                    HIRE
                </Button>
        </Form.Row>   
    </Form>
    )
}
export default NewEmployeeForm;