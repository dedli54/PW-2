import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../CSS/avanzada.css';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function BusquedaAvan() {
  const [validated, setValidated] = useState(false);

  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [categoriaProducto, setCategoriaProducto] = useState('');

  const [resultado, setResultado] = useState([]);
  const [errorBusqueda, setErrorBusqueda] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const params = {};
      if (nombreProducto) params.name = nombreProducto;
      if (precioProducto) params.price = precioProducto;
      if (categoriaProducto) params.categoryName = categoriaProducto;

      if (Object.keys(params).length === 0) {
        setErrorBusqueda('Por favor, ingresa al menos un criterio de búsqueda');
        setResultado([]);
        return;
      }

      axios.get("http://localhost:3000/productos/s", { params })
        .then(response => {
          setResultado(response.data);

          setErrorBusqueda('');
        })
        .catch(error => {
          console.error('Error al buscar el producto:', error);
          setResultado([]);
          if (error.response && error.response.status === 404) {
            setErrorBusqueda('No hay base de datos');
          } else {
            setErrorBusqueda('Ocurrió un error al realizar la búsqueda');
          }
        });
    }
    setValidated(true);
  };

  return (
    <div className='contenedor-avan'>
      <h2>Búsqueda avanzada</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="nombreProducto">
            <Form.Label>Nombre producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de producto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="precioProducto">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio"
              value={precioProducto}
              onChange={(e) => setPrecioProducto(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="categoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Categoría"
              value={categoriaProducto}
              onChange={(e) => setCategoriaProducto(e.target.value)}
            />
          </Form.Group>
          <div className='boton'>
            <Button className='coustome-link'>Buscar</Button>
          </div>
        </Row>
      </Form>

      {resultado.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          {resultado.map((producto, index) => (
            <Form key={index}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4">
                  <Form.Label>Nombre producto</Form.Label>
                  <Form.Control
                    placeholder="Nombre de producto"
                    readOnly
                    value={producto.name}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    placeholder="Precio"
                    readOnly
                    value={producto.price}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    placeholder="Stock"
                    readOnly
                    value={producto.stock}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    placeholder="Categoría"
                    readOnly
                    value={producto.categoryName}
                  />
                </Form.Group>
              </Row>
            </Form>
          ))}
        </div>
      )}
      {errorBusqueda && <p style={{ color: 'red' }}>{errorBusqueda}</p>}
    </div>
  );
}

export default BusquedaAvan;