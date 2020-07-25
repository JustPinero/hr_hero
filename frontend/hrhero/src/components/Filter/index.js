import React from 'react';
import PowersList from "../NewEmployeeForm/PowersList";
import { useStoreContext } from "../../utils/GlobalState";
import {ADD_FILTER, REMOVE_FILTER, FILTER_EMPLOYEES} from "../../utils/actions";


//Bootstrap Components
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Filter } from 'react-bootstrap-icons';


const EmployeeFilter = (props)=>{
    const [state, dispatch] = useStoreContext();

    const handleSkillChange = e => {
       
        if(e.target.checked){
            dispatch({type: ADD_FILTER, filter:e.target.name});
        }else{
            dispatch({type:REMOVE_FILTER, filter:e.target.name})
            dispatch({type:FILTER_EMPLOYEES})
            }
        }
        console.log(state)
    return(
        <Accordion>
            <Card>
                <Card.Header id="filter-toggle__container">
                <Accordion.Toggle as={Button} variant="link" eventKey="0" id="filter-toggle">
                    <Filter size={30}/> FILTER
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Form id="form-container">
                <Form.Row style={{paddingLeft:"10px"}}>
                {PowersList.map((power) => (
                    <Col xs={4} key={power}>
                    <Form.Check 
                        onChange={handleSkillChange}
                        type={"checkbox"}
                        id={power}
                        label={power}
                        name={power}
                        color="blue"    
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