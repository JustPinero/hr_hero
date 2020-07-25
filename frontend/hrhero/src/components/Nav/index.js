//React
import React from 'react';
//CSS
import "./index.css"
//Navigation Components
import {Link} from "react-router-dom"
//Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//Custom Components
import NavButton from '../utils/NavButton'
import Filter from "../Filter"
import SearchBar from '../SearchBar'


const NavBar = ()=>{
    return(
        <Navbar fixed="top" id="nav-container" className="justify-content-center" expand="lg">
            <Link to={"/"} ><Navbar.Brand id="nav-logo">HR HERO</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                <Filter/>
            </Nav>
            <SearchBar/>
            </Navbar.Collapse>
            <NavButton buttonText="ADD STAFF" buttonStyle="addstaff-button" navPath='/newemployee'/>
        </Navbar>
    )
};
export default NavBar;