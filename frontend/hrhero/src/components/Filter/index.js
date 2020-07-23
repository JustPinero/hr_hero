import React from 'react';
import PowersList from "../NewEmployeeForm/PowersList";
import { useStoreContext } from "../../utils/GlobalState";
import {ADD_FILTER, REMOVE_FILTER} from "../../utils/actions";



import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Filter } from 'react-bootstrap-icons';


const EmployeeFilter = (props)=>{
    const [state, dispatch] = useStoreContext();

    const handleSkillChange = e => {
        console.log("CHECKBOX NAME:", e.target.name, e.target.checked)
       
        if(e.target.checked){
            dispatch({type: ADD_FILTER, filter:e.target.name});
        }else{
            dispatch({type: REMOVE_FILTER, filter:e.target.name});
        }
        console.log(state.filters)
    }
    return(
        <Accordion>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <Filter/>
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Form id="form-container">
                <Form.Row>
                {PowersList.map((power) => (
                    <Col xs={4} key={power}>
                    <Form.Check 
                        onChange={handleSkillChange}
                        type={"checkbox"}
                        id={power}
                        label={power}
                        name={power}    
                    />
                    
                    </Col>
                ))}
                </Form.Row>
                </Form>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default EmployeeFilter;