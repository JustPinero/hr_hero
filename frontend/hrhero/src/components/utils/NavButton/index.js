//React
import React from 'react';
//CSS
import "./index.css";
//React Navigation Components
import { useHistory } from "react-router-dom";
//Bootstap Components
import Button from "react-bootstrap/Button";

const BackButton = (props)=>{
    const {buttonStyle, buttonText, navPath} = props
    const history = useHistory();
    console.log(buttonStyle, navPath)
    const clickHandler = e =>{
        e.preventDefault()
        history.push(navPath)
    }
    return (
        <Button B id={buttonStyle} onClick={clickHandler}>{buttonText}</Button>
    )
}
export default BackButton;