/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import wallpaper from '../assets/wallpaper.png';
import profile from '../assets/profile.png';
import appFirebase from '../log-credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const fucionAutenticacion =async(e) =>{
        e.preventDefault();
        const correo = e.target.email.value
        const contrasena= e.target.password.value
        if(registrando){
           try{
            await createUserWithEmailAndPassword(auth, correo, contrasena)

           }catch(error){
            alert("La contraseña tiene que tener mas de 8 caracteres")
           }
        }
        else 
        {
            try{
                await signInWithEmailAndPassword(auth,correo, contrasena)

            } catch(error){
                alert("El correo o la contraseña son incorrectos")
            }
            
        }
  }
  return (
    <div className="container">
      <div className="row">
        {/* Columna para el form */}
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow">
              <img src={profile} alt="" className="estilo-profile" />
              <form onSubmit={fucionAutenticacion}>
                <input type="text" placeholder="Ingrese su E-mail" className="cajatexto" id='email'/>
                <input type="password" placeholder="Ingrese su Contraseña" className="cajatexto" id='password'/>
                <button className="btnform">
                  {registrando ? "Registrate" : "Inicia Sesion"}
                </button>
                <h4 className='texto'>
                  {registrando ? "Si ya te has registrado " : "Aun no te has registrado "}
                  <button className='btnswicth' type="button" onClick={() => setRegistrando(!registrando)}>
                    {registrando ? "Inicia Sesion" : "Registrate"}
                  </button>
                </h4>
              </form>
            </div>
          </div>
        </div>
        {/* Columna más grande imagen */}
        <div className="col-md-8">
          <img src={wallpaper} alt="" className="tamanio-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
