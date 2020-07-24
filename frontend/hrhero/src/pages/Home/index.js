//React
import React from 'react';
//CSS
import "./index.css";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
//Bootstrap Components
import Container from "react-bootstrap/Container";
//Custom Components
import Deck from "../../components/Deck";

//HOMEPAGE
const Home = () => {
    
    return(
        <Container id="homepage-container" fluid>
            <Deck/>
        </Container>
    )
}

export default Home;