import React, { useEffect } from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import EmployeeCard from "../Cards";
import Spinner from "react-bootstrap/Spinner"
import { useStoreContext } from "../../utils/GlobalState";
import {LOADING, GET_ALL_EMPLOYEES } from "../../utils/actions";
import API from "../../utils/API";



const EmployeeDeck = ({props})=>{
    const [state, dispatch] = useStoreContext();

const getEmployees = ()=> {
    dispatch({type:LOADING});
    API.getEmployees()
        .then(results => {
            dispatch({
                type: GET_ALL_EMPLOYEES,
                employees: results.data.employees
            });
        })
        .catch(err=> console.log(err));
};
    useEffect(()=>{
        getEmployees();
    }, []);
return (
    <CardDeck>
        {state.employees ? 
        state.employees.map(employee => EmployeeCard(employee)):
        <Spinner/>
        }
    </CardDeck>)
};
export default EmployeeDeck