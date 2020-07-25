//REACT
import React from 'react';
//BOOTSTRAP COMPONENTS
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
//CUSTOM COMPONENTS
import NavButton from "../../components/utils/NavButton";
import NewEmployeeForm from "../../components/NewEmployeeForm";

//EMPLOYEE SIGNUP FORM
const NewHero = ()=>{
    return (
        <Container style={{marginTop:"10rem"}}>
            <Row>
                <NavButton buttonText="BACK" navPath="/" buttonStyle="back-button"/>
            </Row>
            <NewEmployeeForm/>
        </Container>
    )
};
export default NewHero;