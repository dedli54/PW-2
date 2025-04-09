import React, {useState } from "react";
import { Navigate, Link} from "react-router-dom";
import '../CSS/login.css';
import '../CSS/bootstrapCSS/bootstrap.css';
import icono from '../CSS/images/list.png';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

//Parte de arriba donde se coloca toda la lógica para cargar la información
function Login(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    const handleLogin = () =>{
        if(!email || !pass){
            setMessage("Favor de completar los campos");
            return;
        } else{
            axios.post("http://localhost:3000/login", {
    email: email, 
    pass: pass
})
.then((data) => {
    console.log(data);
    if (data.data.success && data.data.usuario) { // Validar que 'usuario' no sea null
        setMessage(data.data.message);
        localStorage.setItem('sesion', JSON.stringify(data.data.usuario));
        console.log("Inicio de sesión exitoso");
        setLoggedIn(true);
    } else {
        setMessage("Credenciales incorrectas o datos incompletos");
        setLoggedIn(false);
    }
})
.catch((error) => {
    setMessage(`Error al iniciar sesión: ${error.message}`);
});
            console.log("loggedIn:", loggedIn);
            return;
        }
    };

    if(loggedIn){
        return <Navigate to = "/lista-compras" />;
    }

    return(
        <>
    <div className="image">
    <div className="fondo">
        <h1>Chopin List</h1>
        <img src={icono} alt="icono" height={100} width={100} />
        <h2>Iniciar sesión</h2>
        <FloatingLabel controlId="floatingEmail" className="FloatingInput" label="Correo electrónico">
            <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" className="FloatingInput" label="Contraseña">
            <Form.Control
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
        </FloatingLabel>
        <Button onClick={handleLogin} className="coustome-link">Iniciar Sesión</Button>
        <p>¿Aún no tienes tu cuenta?</p>
        <Button href="/registro" className="coustome-link">Regístrate aquí</Button>
        {message && <p>{message}</p>}
    </div>
</div>
        </>
    );
}

export default Login;