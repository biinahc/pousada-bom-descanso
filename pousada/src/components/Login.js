
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Logo from './login.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Login( {onLogin,onAdmin,onLogout }){


    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    onLogout();
   
   
  
const  handleUsuario = (event) => {
    setUsuario(event.target.value);
   
};

const  handleSenha = (event) => {
  setSenha(event.target.value);
 
};




let name = usuario;
const handleLogin =  async  (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/login', { name, senha });


    if (response.status === 200){
    
     
      onAdmin();
      navigate('/home');

    }else if (response.status === 202){ 
     
      onLogin();
      navigate('/home_user', {state:'Usuario'});

    }

  
} catch (response) {

  if(response.status === 401){
    toast.warning('Usuario Inativo',{ theme: "colored"});
  }else if (response.status === 404 && name === ""){
   toast.warning('Campo Usuario é obrigadtorio',{ theme: "colored"});
  }else if (response.status === 404 && senha === ""){
    toast.warning('Campo Senha é obrigadtorio',{ theme: "colored"});
  }else if(response.status === 404){
   toast.error('Usuario ou senha incorreta.',{ theme: "colored"});
  }


  }
};

   return (  
<>
 

    <section className="bg-light py-3 py-md-5 py-xl-8">
   
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4" >
            <div className="mb-5">
              <div className="text-center mb-4">
                <a href="#!">
                  <img src={Logo} alt="BootstrapBrain Logo" width="320" height="100"/>
                </a>
              </div>
              <h4 className="text-center mb-4">Sistema de gestão</h4>
          
            </div>
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <form action="#!">
                 
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="text" required className="form-control" name="usuario" value={usuario}  onChange={handleUsuario}  id="usuario" placeholder="Usuario"  />
                        <label for="email" className="form-label">Usuário</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" name="senha" id="senha" value={senha}  onChange={handleSenha}  placeholder="Senha" required/>
                        <label htmlFor="password" className="form-label">Senha</label>
                      </div>
                    </div>
              
                    <div className="col-12">
                      <div className="d-grid">
                      <Button label="Login" classNameName="btn btn-outline-info btn-sm" icon="pi pi-user"  onClick={handleLogin}/>
                      <ToastContainer />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
       
          </div>
        </div>
      </div>

    </section>
    </>
);
     
}

export default Login;