import React from "react";
import Registro from "./proyecto/Registro";
import Login from "./proyecto/Login";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaCompras from "./proyecto/ListaCompras";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./proyecto/Layout";
import Miperfil from "./proyecto/Miperfil";
import BusquedaAvan from "./proyecto/BusquedaAvan";
import Promociones from "./proyecto/promociones";
import MisTarjetas from "./proyecto/misTarjetas";
import MetodoPago from "./proyecto/ingresar-tarjeta";
import AltaProductos from "./proyecto/alta-productos";
import NuevaCategoria from "./proyecto/NuevaCategoria";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/login" element={<Login />} />

        {/*Rutas con Barra de navegación*/}
        <Route element={<Layout/>}>
          <Route path="/lista-compras" element={<ListaCompras/>}/>
          <Route path="/Miperfil" element={<Miperfil/>}/>
          <Route path="/BusquedaAvan" element={<BusquedaAvan/>}/>
          <Route path="/Promociones" element={<Promociones/>}/>
          <Route path="/mis-tarjetas" element={<MisTarjetas/>}/>
          <Route path="/metodo-pago" element={<MetodoPago/>}/>
          <Route path="/alta-productos" element={<AltaProductos/>}/>
          <Route path="/nueva-categoria" element={<NuevaCategoria/>}/>
        </Route>

        {/* Si agregas más rutas*/}
        <Route path="/lista-compras" element={<ListaCompras />} />

        {/* Ruta por defecto para manejar 404*/}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

