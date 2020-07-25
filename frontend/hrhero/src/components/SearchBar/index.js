import React, { useRef }  from 'react'
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
    const handleSearch = e=>{
        e.preventDefault()
        dispatch({
            type:SEARCH_EMPLOYEES,
            search:searchRef.current.value
        })
    }
    return(
        <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                    Search Category
                </Form.Label>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Form inline>
                <Form.Control
                onChange={handleCategorySelect}
                as="select"
                ref={categoryRef}
                value={state.category}
                className="my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                custom
                >
                    <option value="title">TITLE</option>
                    <option value="firstName">FIRST NAME</option>
                    <option value="lastName">LAST NAME</option>
                    <option value="email">EMAIL</option>
                </Form.Control>
                <FormControl type="submit" onSubmit={e=>console.log(e)} ref={searchRef} type="text" placeholder="Search"  />
                <Button onClick={handleSearch} variant="outline-primary">Search</Button>
                </Form>
                </Accordion.Collapse>
        </Accordion>
    )
}
export default SearchBar;