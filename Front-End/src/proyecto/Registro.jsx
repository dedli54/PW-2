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
    const RegistroExitosoComponent = () =>(
        <div className="">
            <h2>Registro completo</h2>
            <p>Favor de completar la información adicional:</p>
            <Link to={`/informacion-adicional/${email}`} className="">Continuar</Link>
        </div>
    );

    return(
        //Primera división para colocar la imagen del proyecto
        <div className="fondo">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div>
                            <h1>Chopin List</h1>
                            <img src={icono} alt="icono" height={200} width={200}/>
                        </div>
                    </div>

                    <>
                    <div className="col-6">
                        <h2>Crea un Usuario</h2>
                        <br/>
                        <div>
                            <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3">
                                <Form.Control type="text" placeholder="Nombre"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingLastName" label="Apellidos" className="mb-3">
                                <Form.Control type="text" placeholder="Apellidos"
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="mb-3">
                                <Form.Control type="email" placeholder="name@example.com" 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPass" label="Contraseña" className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña"
                                value={pass}
                                onChange={(e)=> setPass(e.target.value)}/>
                            </FloatingLabel>
                        </div>
                        <div>
                            <Button onClick={sendDatos} className="coustome-link">Registrar</Button>
                        </div>
                        <br/>
                        <p>¿Ya tienes cuenta?</p>
                        <Button href ="/Login" className="coustome-link">Iniciar sesión</Button>
                    </div>
                    {message && <p>{message}</p>}
                    </>
                </div>
            </div>
        </div>
    );
}

export default Registro;