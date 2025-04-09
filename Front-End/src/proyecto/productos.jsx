import React, { useState, useEffect } from 'react';
import ProductoCard from './ProductoCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/productos')
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar los productos:', error);
            });
    }, []);

    return (
        <Row style={{ justifyContent: 'center', padding: '20px' }}>
            {productos.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductoCard producto={producto} />
                </Col>
            ))}
        </Row>
    );
}

export default Productos;