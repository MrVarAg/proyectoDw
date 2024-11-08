import { useState, useEffect } from 'react';
import appFirebase from '../src/log-credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Login from './componetnts/Login';
import QrReader from './componetnts/qrReader/qrReader';
import HorarioForm from './componetnts/HorarioForm';
import Reports from './componetnts/Reports'; // Importa el componente Reports
import Menu from './componetnts/menu';
import './App.css';

const auth = getAuth(appFirebase);

function App() {
    const [usuario, setUsuario] = useState(null);
    const [selectedOption, setSelectedOption] = useState('menu'); // Estado para el menú seleccionado

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
            setUsuario(usuarioFirebase ? usuarioFirebase : null);
        });

        return () => unsubscribe();
    }, []);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleReturnToMenu = () => {
        setSelectedOption('menu');
    };

    return (
        <div>
            {usuario ? (
                <>
                    {selectedOption === 'menu' && <Menu onSelectOption={handleSelectOption} />}
                    {selectedOption === 'assignSchedule' && (
                        <>
                            <HorarioForm />
                            <button onClick={handleReturnToMenu}>Volver al Menú</button>
                        </>
                    )}
                    {selectedOption === 'scanQr' && (
                        <>
                            <QrReader />
                            <button onClick={handleReturnToMenu}>Volver al Menú</button>
                        </>
                    )}
                    {selectedOption === 'reports' && (
                        <>
                            <Reports />
                            <button onClick={handleReturnToMenu}>Volver al Menú</button>
                        </>
                    )}
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;