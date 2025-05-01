import React, { useState, useEffect } from "react";
import '../CSS/bootstrapCSS/bootstrap.css';
import '../CSS/listacompras.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

function ListaCompras() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/productos");
                setProductos(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        
        obtenerProductos();
    }, []);

    const addToCart = (product) => {
        if (product.stock <= 0) {
            alert('Lo sentimos, este producto está agotado');
            return;
        }

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProduct = existingCart.find(item => item.id === product.id);
        
        if (existingProduct) {
            // Check if adding one more exceeds available stock
            if (existingProduct.quantity + 1 > product.stock) {
                alert('No hay suficiente stock disponible');
                return;
            }

            const updatedCart = existingCart.map(item =>
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const updatedCart = [...existingCart, { ...product, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        
        alert('Producto agregado al carrito');
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Lista de Productos</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {productos.map((producto) => (
                    <Col key={producto.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{producto.name}</Card.Title>
                                <Card.Text>
                                    <strong>Precio: </strong>${producto.price}
                                    <br />
                                    <strong>Stock: </strong>{producto.stock}
                                    {producto.stock <= 0 && (
                                        <span className="text-danger ms-2">(Agotado)</span>
                                    )}
                                    <br />
                                    <strong>Categoría: </strong>{producto.categoryName}
                                </Card.Text>
                                <Button 
                                    className="coustome-link w-100"
                                    onClick={() => addToCart(producto)}
                                    disabled={producto.stock <= 0}
                                >
                                    {producto.stock <= 0 ? 'Agotado' : 'Agregar al carrito'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ListaCompras;
