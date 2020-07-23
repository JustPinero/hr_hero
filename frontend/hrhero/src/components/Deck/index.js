import React, { useEffect } from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import EmployeeCard from "../Cards";

import { useStoreContext } from "../../utils/GlobalState";
import {LOADING, UPDATE_EMPLOYEES } from "../../utils/actions";
import API from "../../utils/API";



const EmployeeDeck = ({props})=>{
    const [state, dispatch] = useStoreContext();

const getEmployees = ()=> {
    dispatch({type:LOADING});
    API.getEmployees()
        .then(results => {
            dispatch({
                type: UPDATE_EMPLOYEES,
                employees: results.data
            });
        })
        .catch(err=> console.log(err));
};

    useEffect(()=>{
        getEmployees();
    }, []);

return (
    <CardDeck>
        {state.employees.map(employee => (
            EmployeeCard(employee)
        ))}
    </CardDeck>)
};
export default EmployeeDeck