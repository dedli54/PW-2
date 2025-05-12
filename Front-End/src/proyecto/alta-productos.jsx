import { useNavigate } from "react-router-dom";
import "../CSS/altaProductos.css";
import { Form, Row, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AltaProductos() {
    const [categorias, setCategorias] = useState([]);
    const [selectedCat, setSelectedCat] = useState("");
    const [producto, setProducto] = useState("");
    const [precio, setPrecio] = useState(0.00);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerCategorias = async () => {
            try{
                const response = await axios.get("http://localhost:3000/categorias");
                setCategorias(response.data);
            }
            catch(error){
                console.error("Error al obtener categorías:", error);
            }
        };
        
        obtenerCategorias();
    }, []);

    const handleChange = (event) => {
        setSelectedCat(parseInt(event.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        
        // Validate fields
        if (!producto.trim() || !precio || !stock || !selectedCat) {
            alert("Por favor complete todos los campos");
            return;
        }

        const usuario = JSON.parse(localStorage.getItem('sesion'));
        const user = usuario.id;

        axios.post("http://localhost:3000/productos", {
            name: producto,
            price: precio,
            stock: stock,
            categoryId: selectedCat,
            userId: user
        })
        .then(response => {
            alert("Producto agregado correctamente.");
            // Clear form
            setProducto("");
            setPrecio(0);
            setStock(0);
            setSelectedCat("");
            // Optionally redirect
            navigate("/Miperfil");
        })
        .catch(error => {
            console.error("Error al agregar producto:", error.response);
            alert("Error al agregar el producto. Por favor intente de nuevo.");
        });
    };

    return (
        <div className='contenedor-avan'>
            <h2>Alta de productos</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label id='producto'>Nombre del producto:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={producto}
                            onChange={(e) => setProducto(e.target.value)}
                        />
                        <Form.Control.Feedback>Completo</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom02">
                        <Form.Label id='precio'>Precio:</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            step="any"
                            min={0}
                            value={precio}
                            onChange={(e) => setPrecio(parseFloat(e.target.value))}
                        />
                        <Form.Control.Feedback>Completo</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom03">
                        <Form.Label id='categoria'>Stock:</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            min={0}
                            value={stock}
                            onChange={(e) => setStock(parseInt(e.target.value))}
                        />
                        <Form.Control.Feedback>Completo</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom04">
                        <Form.Label id='categoria'>Categoría:</Form.Label>
                        <Form.Select 
                            aria-label="Seleccionar una categoría" 
                            value={selectedCat} 
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback>Completo</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <div className='boton'>
                    <Button type="submit" className='coustome-link w-100 mb-2'>
                        Agregar
                    </Button>
                    <br />
                    <Button type="button" href={"/Miperfil"} className='coustome-link w-100'>
                        Regresar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AltaProductos;
