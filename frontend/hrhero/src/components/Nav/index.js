//React
import React from 'react';
//CSS
import "./index.css"
//Navigation Components
import {Link} from "react-router-dom"
//Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

//Custom Components
import NavButton from '../../components/utils/NavButton'
import Filter from "../Filter"
import SearchBar from '../SearchBar'


const NavBar = ()=>{
    return(
        <Navbar fixed="top" id="nav-container" className="justify-content-center" expand="lg">
            <Link to={"/"} ><Navbar.Brand>HR HERO</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                <Filter/>
            </Nav>
            <SearchBar/>
            </Navbar.Collapse>
            <NavButton buttonText="ADD STAFF" buttonStyle="home-button" navPath='/newemployee'/>
        </Navbar>
    )
};
export default NavBar;