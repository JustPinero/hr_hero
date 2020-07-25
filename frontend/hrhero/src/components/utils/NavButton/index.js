//React
import React from 'react';
//CSS
import "./index.css";
//React Navigation Components
import { useHistory } from "react-router-dom";
//Bootstap Components
import Button from "react-bootstrap/Button";

const NavButton = (props)=>{
    console.log(props)
    let {buttonStyle, buttonText, navPath} = props
    const history = useHistory();
    console.log(buttonStyle, navPath)
    const clickHandler = e =>{
        e.preventDefault()
        history.push(navPath)
    }
    console.log("BUTTON STYL", buttonStyle)
    return (
        <Button id={buttonStyle} onClick={clickHandler}>{buttonText}</Button>
    )
}
export default NavButton;