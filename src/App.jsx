import React, { useState, useEffect } from 'react';
import appFirebase from '../src/log-credenciales';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import Login from './componetnts/Login';
import QrReader from './componetnts/qrReader/qrReader';
import ClaseForm from './componetnts/forms/HorarioForm';
import Reports from './componetnts/Reports';
import Menu from './componetnts/menu';
import AulaForm from './componetnts/forms/AulaForm';
import Seccion from './componetnts/forms/SeccionForm';
import Docente from './componetnts/forms/DocenteForm';


import { Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icono de flecha hacia atrás
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono para cerrar sesión
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

    // Función para manejar la selección de opciones en el menú
    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    // Función para volver al menú principal
    const handleReturnToMenu = () => {
        setSelectedOption('menu');
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Usuario ha cerrado sesión");
                setUsuario(null); // Limpiar el estado de usuario
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
            });
    };

    return (
        <div>
            {usuario ? (
                <>
                    {/* Menu Principal */}
                    {selectedOption === 'menu' && (
                        <>
                            <AppBar position="sticky" sx={{ 
                                backgroundColor: '#1d1934', 
                                height:'80px', 
                                display: 'flex',
                                justifyContent:'center',}}>
                                <Toolbar>
                                    <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                        Menú Principal
                                    </Typography>
                                    <IconButton edge="end" color="inherit" onClick={handleLogout}>
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <Menu onSelectOption={handleSelectOption} />
                        </>
                    )}

                    {/* Componentes seleccionados */}
                    {selectedOption !== 'menu' && (
                        <>
                            {/* AppBar con la flecha hacia atrás */}
                            <AppBar position="sticky" sx={{ 
                                backgroundColor: '#1d1934', 
                                height:'80px', 
                                display: 'flex',
                                justifyContent:'center',}}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={handleReturnToMenu} sx={{ mr: 2 }}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                        {selectedOption === 'assignSchedule' && 'Agregar Clase'}
                                        {selectedOption === 'scanQr' && 'Escanear QR'}
                                        {selectedOption === 'reports' && 'Reportes'}
                                        {selectedOption === 'aula' && 'Aula'}
                                        {selectedOption === 'seccion' && 'Sección'}
                                        {selectedOption === 'docente' && 'Docente'}
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            {/* Renderizar el componente correspondiente */}
                            {selectedOption === 'assignSchedule' && <ClaseForm />}
                            {selectedOption === 'scanQr' && <QrReader />}
                            {selectedOption === 'reports' && <Reports />}
                            {selectedOption === 'aula' && <AulaForm />}
                            {selectedOption === 'seccion' && <Seccion />}
                            {selectedOption === 'docente' && <Docente />}
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
