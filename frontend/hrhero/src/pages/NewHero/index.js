import React from 'react';

import Container from "react-bootstrap/Container";
import NewEmployeeFrom from "../../components/NewEmployeeForm";

const NewHero = ()=>{
    return (
        <Container style={{marginTop:"10rem"}}>
            <NewEmployeeFrom/>
        </Container>
    )
};
export default NewHero;