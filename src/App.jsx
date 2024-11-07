
import { useState, useEffect } from 'react';

import appFirebase from '../src/log-credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(appFirebase);

import Login from '../src/componetnts/Login';
import QrReader from './componetnts/HorarioForm';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []); 

  return (
    <div>
      {usuario ? <QrReader correoUsuario={usuario.email} /> : <Login />}
    </div>
  );
}

export default App;
