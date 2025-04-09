import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductoCard({ producto }) {
    return (
        <Card style={{ width: '18rem', margin: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {/*<Card.Img variant="top" src={producto.imagen || 'https://placehold.co/150'} alt={producto.nombre} style={{ height: '150px', objectFit: 'cover' }} />*/}
            <Card.Body>
                <Card.Title style={{ color: '#4A90E2', fontWeight: 'bold' }}>{producto.name}</Card.Title>
                <Card.Text style={{ color: '#333333' }}>
                    {producto.stock || 'Sin descripción disponible'}
                </Card.Text>
                <Card.Text style={{ color: '#FFD166', fontWeight: 'bold' }}>
                    ${producto.price}
                </Card.Text>
                <Button variant="outline-primary" style={{ borderRadius: '10px' }}>Comprar</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductoCard;