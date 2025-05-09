import React, { useState, useEffect } from 'react';
import '../CSS/tarjetas.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {FormGroup, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function MisTarjetas() {
    const [tarjetas, setTarjetas] = useState([]);
    const usuario = JSON.parse(localStorage.getItem('sesion'));
    const user = parseInt(usuario.id);

    useEffect(() => {
        const obtenerTarjetas = async () => {
            try {
                const response = await axios.get("http://localhost:3000/Mistarjetas", {
                    params: { userId: user }
                });
                setTarjetas(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error al obtener tarjetas:", error);
            }
        };
        
        obtenerTarjetas();
    }, [user]);
    
    return (
        <Container className="cards-container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {tarjetas.map((tarjeta, index) => (
                    <Col key={index}>
                        <Card className="tarjeta-card">
                            <Card.Body>
                                <Form>
                                    <FormGroup>
                                        <Form.Label>Nombre de tarjeta</Form.Label>
                                        <Form.Control 
                                            type='text' 
                                            value={tarjeta.owner} 
                                            readOnly 
                                        />
                                        <br />
                                        <FormControl 
                                            type='text' 
                                            value={tarjeta.number} 
                                            readOnly 
                                        />
                                        <br />
                                        <Button className="coustome-link mt-3">Usar Tarjeta</Button>
                                    </FormGroup>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MisTarjetas;