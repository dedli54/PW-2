import React from "react";
import BarraNav from "./BarraNav";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
        <BarraNav/>
        <Outlet/>
        <Footer/>
        </>
    );
}

export default Layout;