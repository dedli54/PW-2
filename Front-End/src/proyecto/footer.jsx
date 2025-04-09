import React from "react";
import { Card } from "react-bootstrap";
import '../CSS/footer.css';

function Footer() {
    return (
        <Card className="footer-custom">
            <Card.Header className="footer-header">Proyecto de programación web II</Card.Header>
            <Card.Body>
                <Card.Title>Integrantes del equipo:</Card.Title>
                <Card.Text>
                    Alberto Adrian Garcia Camacho, 
                    Cruz Arturo Solis Saldivar, 
                    ChatGTP, 
                    GeminiAI, 
                    La wea de china, 
                    Otras AI, 
                    Las clases del profe
                </Card.Text>
                <Card.Text>
                    Chopin List 1929
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Footer;