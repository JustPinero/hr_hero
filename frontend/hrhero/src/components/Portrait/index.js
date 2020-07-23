import React from 'react';
import "./index.css"
import Image from "react-bootstrap/Image";

const Portrait = (props)=>{
    return(
        <Image id="portrait-img" fluid src={props.portrait}/>
    )
}
export default Portrait