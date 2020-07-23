import React from 'react';
import {Link} from "react-router-dom";

import Card from 'react-bootstrap/Card';



const EmployeeTile = (props)=>{
    console.log("PROPS", props)
    return(
        <div key={props.id}>
            <Link to={`/employees/${props.id}`} activeClassName="active">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={props.portrait} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}
export default EmployeeTile;