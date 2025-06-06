import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function MetodoPago(){
    const[nombre, setNombre] = useState("");
    const[numero, setNumero] = useState("");
    const[clave, setClave] = useState(0);
    const[fecha, setFecha] = useState("");

    const handleAdd = () => {
        // Add validation
        if (!nombre || !numero || !clave || !fecha) {
            alert("Por favor complete todos los campos");
            return;
        }

        try {
            const usuario = JSON.parse(localStorage.getItem('sesion'));
            const user = usuario.id;
            
            // Create a valid date from the month input
            // The fecha value will be in format "YYYY-MM"
            const venc = new Date(fecha + "-01"); // Add day to make it a valid date
            
            if (isNaN(venc.getTime())) {
                throw new Error("Fecha inválida");
            }

            axios.post("http://localhost:3000/tarjetas", {
                owner: nombre,
                number: numero,
                cvv: clave,
                expiry: venc.toISOString(), // Convert to ISO string format
                userId: user
            })
            .then(response => {
                alert("Tarjeta agregada correctamente.");
            })
            .catch(error => {
                console.error("Error al agregar tarjeta:", error.response);
                alert("Error al agregar la tarjeta. Por favor verifique los datos.");
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Error en el formato de la fecha. Por favor verifique los datos.");
        }
    };
    
    return (
    <div className="contenedor-grande">
        <div className="contenedor">
            <div className="row">
                <h2 className="col-4">Datos de tarjeta</h2>
                <div className="col-6">
                    <FloatingLabel controlId="floatingName" label="Nombre del Propietario" className="mb-3" id="usuarioTarjeta">
                        <Form.Control type="text" placeholder="Nombre completo"
                        onChange={(e) => setNombre(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingNumber" label="Número de tarjeta" className="mb-3" id="numeroTarjeta">
                        <Form.Control type="number" placeholder="Número de tarjeta" 
                        onChange={(e) => setNumero(parseInt(e.target.value))}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="CVV" className="mb-3" id="CVV">
                        <Form.Control type="number" placeholder="CVV"
                        onChange={(e) => setClave(parseInt(e.target.value))}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingDate" label="Fecha de vencimiento" className="mb-3" id="fecha">
                        <Form.Control type="month" onChange={(e) => setFecha(e.target.value)} required/>
                    </FloatingLabel>
                <Button  className="coustome-link" onClick={handleAdd}>Aceptar cambios</Button>
                <br/>
                <br/>
                <Button href={"/lista-compras"} className="coustome-link">Cancelar</Button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default MetodoPago;