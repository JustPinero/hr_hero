import React, { useEffect } from 'react';
import "./index.css";
import {useParams} from "react-router-dom";
//Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner';
import API from "../../utils/API";
//Custom Components
import { useStoreContext } from "../../utils/GlobalState";
import { SET_CURRENT_EMPLOYEE} from "../../utils/actions";

import ProfileInfo from "../../components/ProfileInfo";

const Profile = () => {
    const [state, dispatch] = useStoreContext();
    let {id} = useParams();
    useEffect(() => {
        API.getEmployee(id)
        .then(res => dispatch({ type: SET_CURRENT_EMPLOYEE, employee: res.data.employee }))
        .catch(err => console.log(err));
    }, []);
    return (
        <Container id="profilepage-container">
        {state.currentEmployee ?
            <ProfileInfo
            id={id}
            title={state.currentEmployee.title}
            firstName={state.currentEmployee.firstName}
            lastName={state.currentEmployee.lastName}
            email={state.currentEmployee.email}
            portrait={state.currentEmployee.portrait}
            skills={state.currentEmployee.skills}
            />
            :
            <Spinner animation="border" variant="primary" />
        }
        </Container>
    )
}
export default Profile;