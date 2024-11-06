
import { useState, useEffect } from 'react';
// Importar los módulos de Firebase
import appFirebase from '../src/log-credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(appFirebase);

// Importar los componentes Login y QrReader
import Login from '../src/componetnts/Login';
import QrReader from './componetnts/HorarioForm';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  // Usar useEffect para gestionar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      {usuario ? <QrReader correoUsuario={usuario.email} /> : <Login />}
    </div>
  );
}

export default App;
