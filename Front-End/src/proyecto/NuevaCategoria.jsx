import React, { useState } from 'react';
import '../CSS/bootstrapCSS/bootstrap.css';
import '../CSS/Miperfil.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function NuevaCategoria() {
    const [nombreCategoria, setNombreCategoria] = useState('');

    const handleAdd = () => {
        if (!nombreCategoria.trim()) {
            alert("Por favor ingrese un nombre para la categoría");
            return;
        }

        axios.post("http://localhost:3000/categorias", {
            name: nombreCategoria
        })
        .then(response => {
            alert("Categoría agregada correctamente.");
            setNombreCategoria(''); // Clear the input
        })
        .catch(error => {
            console.error("Error al agregar categoría:", error.response);
            alert("Error al agregar la categoría. Por favor intente de nuevo.");
        });
    };

    return (
        <div className="contenedor-grande">
            <div className="contenedor">
                <div className="row">
                    <h2 className="col-4">Nueva Categoría</h2>
                    <div className="col-6">
                        <FloatingLabel 
                            controlId="floatingCategoria" 
                            label="Nombre de la categoría" 
                            className="mb-3"
                        >
                            <Form.Control 
                                type="text" 
                                placeholder="Nombre de la categoría"
                                value={nombreCategoria}
                                onChange={(e) => setNombreCategoria(e.target.value)}
                            />
                        </FloatingLabel>
                        <Button className="coustome-link" onClick={handleAdd}>
                            Agregar Categoría
                        </Button>
                        <br />
                        <br />
                        <Button href="/Miperfil" className="coustome-link">
                            Regresar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevaCategoria;
