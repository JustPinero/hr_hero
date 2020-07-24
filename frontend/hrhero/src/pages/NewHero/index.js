//REACT
import React from 'react';
//BOOTSTRAP
import Container from "react-bootstrap/Container";

import NewEmployeeForm from "../../components/NewEmployeeForm";

//EMPLOYEE SIGNUP FORM
const NewHero = ()=>{
    return (
        <Container style={{marginTop:"10rem"}}>
            <NewEmployeeForm/>
        </Container>
    )
};
export default NewHero;