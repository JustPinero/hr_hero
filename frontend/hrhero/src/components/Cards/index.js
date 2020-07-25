// React
import React from 'react';
//CSS
import "./index.css";
//Navigation Components
import {Link} from "react-router-dom";
//Bootstrap Components
import Card from 'react-bootstrap/Card';


//Generates Individual Tile that will Navigate to respective Character's Profile
const EmployeeTile = (props)=>{
    return(
        <div key={props.id}>
            <Link id='card-link' to={`/employees/${props.id}`}>
                <Card className="mb-3" id='card-container'>
                    <Card.Img style={{height:"15rem"}}variant="top" src={props.portrait} />
                    <Card.Body style={{backgroundColor:"#bd2130"}}>
                        <Card.Title style={{textAlign:"center", fontSize:"2rem", color:"white"}}>{props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}
export default EmployeeTile;