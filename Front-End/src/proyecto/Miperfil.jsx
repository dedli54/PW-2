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

    return(
    <>
    <div className="contenedor-grande">
        <div className="contenedor">
            <div className="row">
                <h2 className="col-4">Información de usuario</h2>
                <div className="col-6">
                    <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3" id="Nombre">
                        <Form.Control type="text" placeholder="Nombre de usuario"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatinglastName" label="Apellidos" className="mb-3" id="Apellidos">
                        <Form.Control type="text" placeholder="Apellidos" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/>
                    </FloatingLabel>
                    <br />
                    <FloatingLabel controlId="floatingEmail" label="Correo electrónico" className="mb-3" id="Correo">
                        <Form.Control type="email" placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" id="Clave">
                        <Form.Control type="password" placeholder="Contraseña" 
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}/>
                    </FloatingLabel>
                    <br />
                    <Button className="coustome-link" href={"/Metodo-Pago"}>Ingresar método de pago</Button>
                    <br />
                    <br />
                    <Button href={"/alta-productos"} className="coustome-link">Agregar producto</Button>
                    <br />
                    <br />
                    <Button href={"/nueva-categoria"} className="coustome-link">Agregar Categoría</Button>
                    <br />
                    <br />
                    <Button id="btnCambios" className="coustome-link" onClick={handleUpdate}>Aceptar cambios</Button>
                    <br/>
                    <br/>
                    <Button href={"/lista-compras"} className="coustome-link">Cancelar</Button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Miperfil;