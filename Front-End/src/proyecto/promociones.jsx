import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import promos from '../CSS/images/promos.png';
import switcho from '../CSS/images/switcho.png';
import laptop from '../CSS/images/laptop2.png';
import Productos from './productos';
import '../CSS/promociones.css';

function Promociones() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
                <Carousel>
                    <Carousel.Item>
                        <Image className='imageArreglo' src={promos} alt="Promociones" fluid />
                        <Carousel.Caption>
                            <h3>¡Mira nuestros descuentos!</h3>
                            <p className="promo">
                                En este buen fin, no olvides revisar todas nuestras promociones disponibles
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image className='imageArreglo' src={switcho} alt="Promoción celulares" fluid />
                        <Carousel.Caption>
                            <h3>Revisa nuestra sección de electrónica</h3>
                            <p className="promo">¡Todo lo que buscas para tu hogar!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image className='imageArreglo' src={laptop} alt="Promoción computadores" fluid />
                        <Carousel.Caption>
                            <h3>Para una navidad espectacular</h3>
                            <p className="promo">
                                Un regalo no se le niega a nadie, ¿Cierto?
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa' }}>
                <h2 style={{ color: '#4A90E2', marginBottom: '20px' }}>Nuestros Productos</h2>
                <Productos />
            </div>
        </div>
    );
}

export default Promociones;

