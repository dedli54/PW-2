import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Navbar, Nav, NavDropdown, Col, Row, Button } from "react-bootstrap";
import icon from "../CSS/images/list.png"; // Importa la imagen correctamente
import '../CSS/navbar.css';
import { useNavigate } from "react-router-dom";

function BarraNav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the session
        localStorage.removeItem('sesion');
        // Redirect to login
        navigate('/login');
    };

    return (
        <Navbar className="navbar-custom">
            <Container className="px-4">
                <Navbar.Brand href="#" className="text-decoration-none">
                    <img src={icon} alt="Shopping logo" width={30} height={30} className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Brand href="./lista-compras" className="text-decoration-none">Chopin List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">  
                        <Nav.Link href="./BusquedaAvan" className="text-decoration-none">Búsqueda avanzada</Nav.Link>
                        <NavDropdown title="Información personal" id="basic-nav-dropdown" className="text-decoration-none">
                            <NavDropdown.Item href="./Miperfil" className="text-decoration-none">Mi perfil</NavDropdown.Item>
                            <NavDropdown.Item href="./mis-tarjetas" className="text-decoration-none">Mis tarjetas</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Row>
                            <Col xs="auto">

                            </Col>
                            <Col xs="auto">
                            </Col>
                        </Row>
                    </Form>
                    <Button 
                        variant="outline-light" 
                        onClick={handleLogout}
                        className="ms-2"
                    >
                        Cerrar Sesión
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarraNav;
