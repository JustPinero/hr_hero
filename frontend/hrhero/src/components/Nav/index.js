import React from 'react';
import {Link} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";



import { useStoreContext } from "../../utils/GlobalState";


const NavBar = ()=>{
    const [store]= useStoreContext();
    return(
        <Navbar className="justify-content-center" bg="light" expand="lg">
            <Navbar.Brand>HR HERO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-center" >
                <Nav.Link href="#home"><Link to={`/`}>Home</Link></Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search"  />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
};
export default NavBar;