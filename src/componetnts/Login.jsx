/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import profile from '../assets/profile.png';
import appFirebase from '../log-credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);

  const fucionAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contrasena = e.target.password.value;

    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, contrasena);
      } catch (error) {
        alert("La contraseña tiene que tener más de 8 caracteres");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contrasena);
      } catch (error) {
        alert("El correo o la contraseña son incorrectos");
      }
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-md-5 d-flex justify-content-center">
        <div className="card card-body shadow-lg p-5" style={{ maxWidth: '400px', borderRadius: '15px', backgroundColor: '#ffffff' }}>
          <img
            src={profile}
            alt="Profile Icon"
            className="mb-4 mx-auto d-block rounded-circle"
            style={{ width: '80px', height: '80px', border: '2px solid #007bff' }}
          />
          <h3 className="text-center mb-4" style={{ color: '#333' }}>
            {registrando ? "Registrarse" : "Iniciar Sesión"}
          </h3>
          <form onSubmit={fucionAutenticacion}>
            <input
              type="text"
              placeholder="Ingrese su E-mail"
              className="form-control mb-3 p-2 shadow-sm"
              id="email"
              style={{ borderRadius: '10px', fontSize: '16px' }}
            />
            <input
              type="password"
              placeholder="Ingrese su Contraseña"
              className="form-control mb-3 p-2 shadow-sm"
              id="password"
              style={{ borderRadius: '10px', fontSize: '16px' }}
            />
            <button
              className="btn w-100 mb-3"
              style={{
                backgroundColor: registrando ? '#28a745' : '#007bff',
                color: '#fff',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {registrando ? "Registrarse" : "Iniciar Sesión"}
            </button>
            <h5 className="text-center" style={{ color: '#666' }}>
              {registrando ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
              <button
                className="btn btn-link p-0"
                type="button"
                onClick={() => setRegistrando(!registrando)}
                style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
              >
                {registrando ? "Inicia Sesión" : "Regístrate"}
              </button>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
