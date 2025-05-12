import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../CSS/bootstrapCSS/bootstrap.css';
import '../CSS/registro.css';
import icono from '../CSS/images/list.png';
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

function Registro(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);

    const sendDatos = () =>{
        //Validaciones
        axios.post("http://localhost:3000/registro", {
            name: name,
            lastName: lastName,
            email: email,
            pass: pass
        })
        .then(() => {
            setMessage("Registro completado");
            setRegistroExitoso(true);
        })
        .catch((error) => {
            console.error(`Error al crear usuario: ${error.message}`);
            if (error.response) {
                console.error("Detalles del error:", error.response.data); // Ver detalles del error del servidor
            }
        });
    }

    //Componente de registro exitoso
    // eslint-disable-next-line no-unused-vars
    const RegistroExitosoComponent = () =>(
        <div className="">
            <h2>Registro completo</h2>
            <p>Favor de completar la información adicional:</p>
            <Link to={`/informacion-adicional/${email}`} className="">Continuar</Link>
        </div>
    );

    return (
        <div className="fondo">
            <div className="container">
                {/* Fila para el título y la imagen */}
                <div className="row text-center mb-4">
                    <div className="col-12">
                        <h1>Chopin List</h1>
                        <img src={icono} alt="icono" height={150} width={150} />
                    </div>
                </div>
    
                {/* Fila para el formulario */}
                <div className="row">
                    <div className="col-md-12">
                        <h2>Crea un Usuario</h2>
                        <FloatingLabel controlId="floatingName" label="Nombre" className="FloatingInput">
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingLastName" label="Apellidos" className="FloatingInput">
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="FloatingInput">
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPass" label="Contraseña" className="FloatingInput">
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </FloatingLabel>
                        <div className="text-center">
                            <Button 
                                onClick={sendDatos} 
                                className="coustome-link"
                                as="a"
                                style={{ display: 'inline-block', width: 'auto' }}
                            >
                                Registrar
                            </Button>
                        </div>
                        <br />
                        <p>¿Ya tienes cuenta?</p>
                        <div className="text-center">
                            <Button href="/Login" className="coustome-link">Iniciar sesión</Button>
                        </div>
                        {message && <p className={registroExitoso ? "message-success" : "message-error"}>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;