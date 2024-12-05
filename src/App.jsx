// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import appFirebase from '../src/log-credenciales';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import AlumnoForm from './componetnts/forms/AlumnoForm';
import Login from './componetnts/Login';
import QrReader from './componetnts/qrReader/qrReader';
import QRScanner from './componetnts/qrReader/newQrCode';
import ClaseForm from './componetnts/forms/HorarioForm';
import Reports from './componetnts/Reports';
import Menu from './componetnts/menu';
import AulaForm from './componetnts/forms/AulaForm';
import Seccion from './componetnts/forms/SeccionForm';
import Docente from './componetnts/forms/DocenteForm';
import CarreraForm from './componetnts/forms/CarreraForm';
import PeriodoForm from './componetnts/forms/AgregarPeriodo';
import AsignarClaseForm from './componetnts/forms/AsignarClaseForm';
import AgregarDiaClaseForm from './componetnts/forms/AgregarDiaClase';

import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
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

        // Restaurar la opción seleccionada desde localStorage
        const storedOption = localStorage.getItem('selectedOption');
        if (storedOption) {
            setSelectedOption(storedOption);
        }

        return () => unsubscribe();
    }, []);

    // Función para manejar la selección de opciones en el menú
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        localStorage.setItem('selectedOption', option); // Guardar en localStorage
    };

    // Función para volver al menú principal
    const handleReturnToMenu = () => {
        setSelectedOption('menu');
        localStorage.setItem('selectedOption', 'menu'); // Guardar en localStorage
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Usuario ha cerrado sesión");
                setUsuario(null); // Limpiar el estado de usuario
                localStorage.removeItem('selectedOption'); // Limpiar el localStorage
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
                                        {selectedOption === 'newqr' && 'Nuevo QR'}
                                        {selectedOption === 'carrera' && 'Carrera'}
                                        {selectedOption === 'alumno' && 'Alumno'}
                                        {selectedOption === 'periodo' && 'Periodo'}
                                        {selectedOption === 'assignClass' && 'Aperurar Clase'}
                                        {selectedOption === 'assignDay' && 'Asignar Día de Clase'}

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
                            {selectedOption === 'newqr' && <QRScanner />}
                            {selectedOption === 'carrera' && <CarreraForm />}
                            {selectedOption === 'alumno' && <AlumnoForm />}
                            {selectedOption === 'periodo' && <PeriodoForm />}
                            {selectedOption === 'assignClass' && <AsignarClaseForm />}
                            {selectedOption === 'assignDay' && <AgregarDiaClaseForm />}
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
