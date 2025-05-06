import React from "react";
import BarraNav from "./BarraNav";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <div className="page-container">
        <BarraNav/>
        <main>
            <Outlet/>
        </main>
        
        <Footer/>
        </div>
    );
}

export default Layout;