import React from 'react';

import Image from "react-bootstrap/Image";

const Portrait = ({props})=>{
    return(
        <Image src={props.portrait}/>
    )
}
export default Portrait