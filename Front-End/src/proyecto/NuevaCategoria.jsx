import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../CSS/avanzada.css';
import axios from "axios";

function NuevaCategoria() {
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [validated, setValidated] = useState(false);

    const handleAdd = (event) => {
        event.preventDefault();
        if (!nombreCategoria.trim()) {
            setValidated(true);
            return;
        }
        axios.post("http://localhost:3000/categorias", {
            name: nombreCategoria
        })
        .then(response => {
            alert("Categoría agregada correctamente.");
            setNombreCategoria('');
            setValidated(false);
        })
        .catch(error => {
            const backendMsg = error.response?.data?.error;
            if (backendMsg) {
                alert(backendMsg);
            } else {
                alert("Error al agregar la categoría. Por favor intente de nuevo.");
            }
            console.error("Error al agregar categoría:", error.response);
        });
    };

    return (
        <div className='contenedor-avan'>
            <h2 className="text-center" style={{ fontWeight: 'bold' }}>Nueva Categoría</h2>
            <Form noValidate validated={validated} onSubmit={handleAdd}>
                <Form.Group controlId="nombreCategoria" className="mb-3">
                    <Form.Label>Nombre de la categoría</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre de la categoría"
                        value={nombreCategoria}
                        onChange={(e) => setNombreCategoria(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingrese un nombre para la categoría
                    </Form.Control.Feedback>
                </Form.Group>
                <div className='boton'>
                    <br />
                    <Button type="submit" className='coustome-link w-100 mb-2'>
                        Agregar Categoría
                    </Button>
                    <br />
                    
                    <Button href="/Miperfil" className='coustome-link w-100'>
                        Regresar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default NuevaCategoria;
