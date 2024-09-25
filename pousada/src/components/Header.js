import React from "react";
import Logo from './PBC.png';
import { Outlet, Link } from "react-router-dom";
import Home from './Home';


function Header(){

    const link = {
      textDecoration: 'none',  
      color:'#363636'
       
     };




    return (  

        <div>

<link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />


<nav className="navbar navbar-expand-lg  bg-body-tertiary" style={{background:'#87CEEB'}}>
 
  <div className="container-fluid">
 
    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={Logo}
          width="70"
          alt="Pousada Bom Descanso"
          loading="lazy"
        />
      </a>
    
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link lni lni-home">

           <Link to="/home" style={link}><strong>Início</strong></Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link lni lni-users" > 
            
          <Link to="/usuarios" style={link}><strong>Usuários</strong></Link>
          
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link lni lni-layers" > 
            
          <Link to="/produtos/1" style={link}><strong>Produtos</strong></Link>
          
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link lni lni-list" > 
            
          <Link to="/categorias" style={link}><strong>Categorias</strong></Link>
          
          </a>
        </li>
    
      </ul>

    </div>

    <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
                <a className="nav-link" >Bem-vindo ADM</a>
            </li>
            <li className="nav-item me-3 me-lg-0">
                <a className="nav-link" ><i className="fas fa-right-to-bracket fa-x2"></i> <Link to="/" style={link}><strong>Sair</strong></Link></a>
            </li>
            <li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" > </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" > </a>
            </li>
     </ul>

    
  
  </div>
 
</nav>


 
   <Outlet />
  
   
      </div>
   

    );
     
}

export default Header;