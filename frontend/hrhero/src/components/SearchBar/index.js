import React, { useRef }  from 'react'
import { useStoreContext } from "../../utils/GlobalState";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import {SEARCH_EMPLOYEES, SELECT_SEARCH_CATERGORY } from "../../utils/actions";

const SearchBar = ()=>{
    const [state, dispatch] = useStoreContext();

    const categoryRef = useRef();
    const searchRef = useRef()

    const handleCategorySelect =()=>{
        console.log("CATEGORY", state.category)
        dispatch({
            type:SELECT_SEARCH_CATERGORY,
            category: categoryRef.current.value
        })
    }
    const handleSearch = e=>{
        e.preventDefault()
        console.log("I AM IN THE HANDLE SEARCH BUTTON")
        console.log("searchRef", searchRef.current.value)
        console.log("TARGET", e.target)
        console.log(state)
        dispatch({
            type:SEARCH_EMPLOYEES,
            search:searchRef.current.value
        })
    }
    return(
        <Form inline>
            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                Search Category
            </Form.Label>
    <Form.Control
        onChange={handleCategorySelect}
        as="select"
        ref={categoryRef}
        defaultValue="title"
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
    )
}
export default SearchBar