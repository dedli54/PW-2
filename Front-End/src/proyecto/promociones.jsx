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
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa' }}>
                <h2 style={{ color: '#4A90E2', marginBottom: '20px' }}>Tu lista</h2>
                <Productos />
            </div>
        </div>
    );
}

export default Promociones;

