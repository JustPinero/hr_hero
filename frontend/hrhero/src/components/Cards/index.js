import React from 'react';
import Card from 'react-bootstrap/Card';

const EmployeeTile = ({props})=>{
    return(
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.portrait} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}
export default EmployeeTile;