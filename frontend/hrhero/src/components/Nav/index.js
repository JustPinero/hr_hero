import React from 'react';
import "./index.css"
import {Link} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SearchBar from '../SearchBar'
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Filter from "../Filter"



import { useStoreContext } from "../../utils/GlobalState";


const NavBar = ()=>{
    return(
        <Navbar fixed="top" id="nav-container" className="justify-content-center" bg="light" expand="lg">
            <Link to={"/"} ><Navbar.Brand>HR HERO</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                <Link to={`/`}>Home</Link>
                </Nav>
                <Nav  >
                <Link to={`/newemployee`}>Add Staff</Link>
                </Nav>
            </Navbar.Collapse>
            <Filter/>
          <SearchBar/>
        </Navbar>
    )
};
export default NavBar;