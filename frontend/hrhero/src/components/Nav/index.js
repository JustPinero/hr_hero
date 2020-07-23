import React from 'react';
import {Link} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Filter from "../Filter"



import { useStoreContext } from "../../utils/GlobalState";


const NavBar = ()=>{
    return(
        <Navbar fixed="top" className="justify-content-center" bg="light" expand="lg">
            <Navbar.Brand>HR HERO</Navbar.Brand>
            <Filter/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                <Link to={`/`}>Home</Link>
                </Nav>
                <Nav  >
                <Link to={`/newemployee`}>Add Staff</Link>
                </Nav>
            </Navbar.Collapse>
          
        </Navbar>
    )
};
export default NavBar;