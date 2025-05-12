import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import '../CSS/carrito.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Carrito() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Load cart items from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
        calculateTotal(savedCart);
    }, []);

    const calculateTotal = (items) => {
        const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    const handleCheckout = async () => {
        try {
            // Update stock for each item
            for (const item of cartItems) {
                await axios.put(`http://localhost:3000/productos/${item.id}/stock`, {
                    quantity: item.quantity
                });
            }

            // Clear cart after successful purchase
            setCartItems([]);
            localStorage.removeItem('cart');
            setTotal(0);
            
            alert('¡Compra realizada con éxito!');
            navigate('/lista-compras'); // Redirect to products page
        } catch (error) {
            console.error('Error during checkout:', error);
            setError('Error al procesar la compra. Por favor intente nuevamente.');
        }
    };

    return (
        <Container className="cart-container my-4">
            <h2 className="mb-4">Carrito de Compras</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            {cartItems.length === 0 ? (
                <div className="text-center py-4">
                    <h4>Tu carrito está vacío</h4>
                    <br />
                    <div className="row">
                        <div className="col"></div> 
                        <div className="col-2">
                            <Button 
                                href="/lista-compras" 
                                className="coustome-link w-100"
                            >
                                Continuar Comprando
                            </Button>
                        </div>
                        <div className="col"></div> 
                    </div>
                </div>
            ) : (
                <>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end align-items-center">
                        <h4 className="me-4">Total: ${total.toFixed(2)}</h4>
                        <Button variant="success" onClick={handleCheckout}>
                            Proceder al Pago
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default Carrito;