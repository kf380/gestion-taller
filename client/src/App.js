import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Ordenes from "./components/Ordenes";
import Presupuesto from "./components/Presupuesto";
import Vehiculo from "./components/Vehiculo";
import Calendario from "./components/Calendario";
import Compras from "./components/Compras";
import Ventas from "./components/Ventas";
import Factura from "./components/Factura";
import EstadoCaja from "./components/EstadoCaja";
import CierreCaja from "./components/CierreCaja";
import Movimientos from "./components/Movimientos";
import CuentaCorrientes from "./components/CuentaCorrientes";
import Repuestos from "./components/Repuestos";
import Table1 from "./components/Table1";
import Proveedores from "./components/Proveedores";
import Clientes from "./components/Clientes";
import Cheques from "./components/Cheques";




import './App.css';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Route exact path="/" component={Home}/>
    <Route exact path="/Dashboard/Metricas" component={Home}/>
    <Route exact path="/Prueba" component={Table1}/>
    <Route exact path="/Taller/Ordenes" component={Ordenes}/>
    <Route exact path="/Taller/Presupuesto" component={Presupuesto}/>
    <Route exact path="/Taller/Vehiculo" component={Vehiculo}/>
    <Route exact path="/Taller/Calendario" component={Calendario}/>
    <Route exact path="/Taller/Factura" component={Factura}/>
    <Route exact path="/Administracion/Compras" component={Compras}/>
    <Route exact path="/Administracion/Ventas" component={Ventas}/>
    <Route exact path="/Administracion/Proveedores" component={Proveedores}/>
    <Route exact path="/Administracion/Clientes" component={Clientes}/>
    <Route exact path="/Caja/EstadoCaja" component={EstadoCaja}/>
    <Route exact path="/Caja/Cierres" component={CierreCaja}/>
    <Route exact path="/Caja/Movimientos" component={Movimientos}/>
    <Route exact path="/Caja/CuentaCorrientes" component={CuentaCorrientes}/>
    <Route exact path="/Caja/Cheques" component={Cheques}/>
    <Route exact path="/Inventario/Productos" component={Repuestos}/>

  
    </BrowserRouter>
    </div>
  );
}

export default App;
