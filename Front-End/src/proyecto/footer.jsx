import React from "react";
import {Card, CardBody, CardHeader} from "react-bootstrap";

function Footer(){
    return(
        <Card bg="secondary" text="white">
            <CardHeader>Proyecto de programación web ll</CardHeader>
            <CardBody>
                <Card.Title>Integrantes del equipo:</Card.Title>
                <Card.Text>
                    Alberto Adrian Garcia Camacho, 
                    Cruz Arturo Solis Saldivar, 
                    ChatGTP, 
                    GeminiAI, 
                    La wea de china, 
                    Otras ai, 
                    Las clases del profe
                </Card.Text>
                <Card.Text>
                    Chopin List 1929
                </Card.Text>
            </CardBody>
        </Card>
    );
}

export default Footer;