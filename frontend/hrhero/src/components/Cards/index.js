import React from 'react';
import {Link} from "react-router-dom";
//Bootstrap Components
import Card from 'react-bootstrap/Card';


//Generates Individual Tile that will Navigate to respective Character's Profile
const EmployeeTile = (props)=>{
    return(
        <div key={props.id}>
            <Link to={`/employees/${props.id}`}>
                <Card style={{ width: '18rem', height:"20rem" }}>
                    <Card.Img style={{height:"15rem"}}variant="top" src={props.portrait} />
                    <Card.Body>
                        <Card.Title style={{textAlign:"center", fontSize:"3rem", color:"royalblue"}}>{props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}
export default EmployeeTile;