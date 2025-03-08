import React, { useState, useEffect } from 'react';
import '../CSS/tarjetas.css';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Banorte from '../CSS/images/tarjetas/banorte.png';
import Afirme from '../CSS/images/tarjetas/afirme.png';
import Banamex from '../CSS/images/tarjetas/citibanamex.png';
import BBVA from '../CSS/images/tarjetas/BBVA.png';
import {FormGroup, Form, FormControl } from 'react-bootstrap';
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
    }, []);

    const obtenerImagen = (nombreBanco) => {
        switch (nombreBanco) {
            case 'Banorte':
                return Banorte;
            case 'Afirme':
                return Afirme;
            case 'Banamex':
                return Banamex;
            case 'BBVA':
                return BBVA;
            default:
                return Banorte; // Imagen por defecto si no coincide
        }
    };
    
    return (
        <Carousel data-bs-theme="dark">
            {tarjetas.map((tarjeta, index) => (
                <Carousel.Item key={index}>
                    <Card bg='light' text='black'>
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
                                    <Image 
                                        id='tarjetaImage' 
                                        src={obtenerImagen("")} 
                                        height={60} 
                                    />
                                    <Button className="coustome-link">Usar Tarjeta</Button>
                                </FormGroup>
                            </Form>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default MisTarjetas;