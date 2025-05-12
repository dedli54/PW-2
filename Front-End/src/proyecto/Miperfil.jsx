import React, { useEffect, useState } from "react";
import '../CSS/bootstrapCSS/bootstrap.css';
import '../CSS/Miperfil.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function Miperfil(){
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [lastName, setLastName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [cambios, setCambios] = useState(false);

    //Cargar datos
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('sesion')); // Recuperar datos del usuario desde localStorage
        if (usuario) {
            setId(usuario.id);
            setName(usuario.name);
            setEmail(usuario.email);
            setPass(usuario.pass);
            setLastName(usuario.lastName);
        }
    }, []);

    const handleUpdate = () => {
        const usuario = JSON.parse(localStorage.getItem('sesion'));
        axios.put("http://localhost:3000/perfil", {
            id: id,
            name: name,
            lastName: lastName,
            email: email,
            pass: pass
        })
        .then(response => {
            setCambios(true);
            alert("Perfil actualizado correctamente.");
            console.log('Perfil actualizado:', response.data);
            localStorage.setItem('sesion', JSON.stringify({
                ...usuario,
                name,
                lastName,
                email,
                pass
            }));
        })
        .catch(error => {
            console.error("Error al actualizar el perfil:", error.response);
        });
        console.log("Datos del usuario:", usuario.id, name, lastName);
    };

    return (
        <>
            <div className="contenedor-grande">
                
                    <div className="row mb-4">
                        <h2 className="col-12 text-center">Información de usuario</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="col-md-6">
                            <FloatingLabel controlId="floatinglastName" label="Apellidos" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Apellidos"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FloatingLabel controlId="floatingEmail" label="Correo electrónico" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="col-md-6">
                            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="row text-center mt-4">
                        <div className="col-md-4">
                            <Button href={"/alta-productos"} className="coustome-link w-100">Agregar producto</Button>
                        </div>
                        <div className="col-md-4">
                            <Button href={"/nueva-categoria"} className="coustome-link w-100">Agregar Categoría</Button>
                        </div>
                        <div className="col-md-4">
                            <Button id="btnCambios" className="coustome-link w-100" onClick={handleUpdate}>Aceptar cambios</Button>
                        </div>
                    </div>
                    <div className="row text-center mt-3">
                        <div className="col-md-12">
                            <Button href={"/lista-compras"} className="coustome-link w-100">Cancelar</Button>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default Miperfil;