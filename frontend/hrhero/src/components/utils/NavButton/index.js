//React
import React from 'react';
//React Navigation Components
import { useHistory } from "react-router-dom";
//Bootstap Components
import Button from "react-bootstrap/Button";

const BackButton = (props)=>{
    const {buttonStyle, navPath} = props
    const history = useHistory();
    const clickHandler = e =>{
        e.preventDefault()
        history(navPath)
    }
    return (
        <Button B id={buttonStyle} onClick={clickHandler}>BACK</Button>
    )
}
export default BackButton;