import React from 'react';
import {Link} from "react-router-dom"
import welcomeBanner from "../../assets/img/welcome_banner.jpeg"

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image"

const WelcomePage = (props)=>{
    return(
        <Container style={{background:"blue", display:"flex",alignItems:"center", justifyContent:"center", height:"100vh",}}fluid>
            <Link to="/">
                <Image style={{width:"70rem", height:"40rem"}} src={welcomeBanner}/>
            </Link>
        </Container>
        
    )
}
export default WelcomePage;