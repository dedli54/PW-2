import React from "react";
import '../CSS/bootstrapCSS/bootstrap.css';
import nintendo from '../CSS/images/NintendoSwitch.png';
import play from '../CSS/images/play5.png';
import carrito from '../CSS/images/carrito.png';
import '../CSS/listacompras.css';


function ListaCompras() {
    return (
        <>
        <div className="row">
            <h1>Chopin List</h1>
            <div className="container-lista col-5">
                <h3 class="">Tenemos para ti las mejores promociones en todas las consolas</h3>
                <div className="container-images col-6">
                    <img src={nintendo} alt="Nintendo Switch" height={100} width={200}/>
                    <img src={play} alt="Playstation 5" height={200} width={200}/>
                </div>
            </div>
            <div className="container-lista col-5">
                <h3>Si creas tu cuenta con nosotros, tendrás un descuento adicional en el envio</h3>
                <div>
                    <img src={carrito} alt="Ejemplo de carrito" height={100} width={100}/>
                </div>
            </div>
        </div>
        </>
    );
}

export default ListaCompras;
