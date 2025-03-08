import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {Form} from 'react-bootstrap';
import axios from 'axios'
import React, { useState, useEffect } from 'react';

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/productos")
          .then(response => {
            setProductos(response.data);
            console.log(productos);
          })
          .catch(error => {
            console.error('Error al obtener los productos:', error);
          });
      }, []);

    return (
    <CardGroup>
      {productos.map((producto, index) => (
        <Card key={index}>
          <Card.Body>
            <Form>
              <Form.Group controlId={`producto-${index}`}>
                <Form.Label>{producto.name}</Form.Label>
                <Form.Control
                  type='text'
                  value={producto.name}
                  readOnly
                />
                <br/>
                <Form.Control
                  type='number'
                  value={producto.price}
                  readOnly
                />
                <br/>
                <Form.Control
                  type='number'
                  value={producto.stock}
                  readOnly
                />
                <br/>
                <Form.Control
                  type='text'
                  value={producto.categoryName}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
}

export default Productos;
