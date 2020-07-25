import React, { useRef }  from 'react';
import "./index.css";
import { useStoreContext } from "../../utils/GlobalState";
//Bootstrap Components
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
//Actions
import {SEARCH_EMPLOYEES, SELECT_SEARCH_CATERGORY } from "../../utils/actions";

//Allows users to search employees
const SearchBar = ()=>{
    const [state, dispatch] = useStoreContext();

    const categoryRef = useRef();
    const searchRef = useRef()

    const handleCategorySelect =()=>{
        dispatch({
            type:SELECT_SEARCH_CATERGORY,
            category: categoryRef.current.value
        })
    }
    const handleKeyDown=(e)=> {
        if (e.keyCode === 13 ) {
            e.preventDefault()
            dispatch({
                type:SEARCH_EMPLOYEES,
                search:searchRef.current.value
            })
        }
      }
    const handleSearch = e=>{
        e.preventDefault()
        dispatch({
            type:SEARCH_EMPLOYEES,
            search:searchRef.current.value
        })
    }
    return(
        <Accordion id="search-container">
            <Accordion.Toggle as={Button} id="search-toggle" variant="link" eventKey="0">
                <Form.Label className="my-1 mr-2">
                    CATEGORY SEARCH
                </Form.Label>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" >
                <Form inline >
                <Form.Control
                onChange={handleCategorySelect}
                as="select"
                ref={categoryRef}
                color="blue"
                value={state.category}
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref search-text"
                custom
                >
                    <option value="title">TITLE</option>
                    <option value="firstName">FIRST NAME</option>
                    <option value="lastName">LAST NAME</option>
                    <option value="email">EMAIL</option>
                </Form.Control>
                <FormControl onKeyDown={handleKeyDown} type="submit" className="search-text" onSubmit={e=>console.log(e)} ref={searchRef} type="text" placeholder="Search"  />
                <Button id="search-toggle" onClick={handleSearch} style={{marginLeft:"5px"}} variant="outline-primary">Search</Button>
                </Form>
                </Accordion.Collapse>
        </Accordion>
    )
}
export default SearchBar;