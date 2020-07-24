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
import Button from "react-bootstrap/Button";
//Custom Components
import Filter from "../Filter"
import SearchBar from '../SearchBar'



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