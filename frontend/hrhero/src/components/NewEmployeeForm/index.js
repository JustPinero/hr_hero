import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_EMPLOYEE, LOADING } from "../../utils/actions";
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
    const [sate, dispatch] = useStoreContext();

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch({type: LOADING});
        API.addEmployee({
            title: titleRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            portrait: portraitRef.current.value,
            skills: skillsRef.current.value
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
    <Form>

        <Form.Row>
            <Col>
                <Image src={QuestionMark}/>
                <Form.Control placeholder="Portrait URL" />
            </Col>
            <Col>
                <Form.Control placeholder="Title" />
            </Col>
            <Col>
                <Form.Control placeholder="Email" />
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <Form.Control placeholder="First name" />
            </Col>
            <Col>
                <Form.Control placeholder="Last name" />
            </Col>
        </Form.Row>
        {PowersList.map((type) => (
            <div key={`default-${power}`} className="mb-3">
            <Form.Check 
                type={"checkbox"}
                id={`default-${power}`}
                label={`default ${power}`}
            />
            </div>
        ))}
    </Form>
    )
}