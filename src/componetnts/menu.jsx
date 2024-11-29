// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Container, Typography, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { signOut } from 'firebase/auth';
import appFirebase from '../log-credenciales';
import { getAuth } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono para cerrar sesión
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icono para Asignar Horario
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'; // Icono para Escanear Código QR
import AssessmentIcon from '@mui/icons-material/Assessment'; // Icono para Reportes
import ClassroomIcon from '@mui/icons-material/Class'; // Icono para Agregar Aula
import SchoolIcon from '@mui/icons-material/School'; // Icono para Agregar Sección
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icono para Agregar Docente

const auth = getAuth(appFirebase);

const Menu = ({ onSelectOption }) => {
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Usuario ha cerrado sesión exitosamente");
                alert("Sesión cerrada con éxito");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
                alert("Hubo un error al intentar cerrar sesión");
            });
    };

    return (
        <div>
            {/* Barra de navegación con fondo degradado */}
           

            {/* Contenedor principal del menú */}
            <Container maxWidth="lg" sx={{ 
                marginTop:10,
            }}>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"  // Tres botones por fila
                    gap={4}  // Reducido el espacio entre los botones
                    sx={{
                        minHeight: '100%',  // Altura mínima del contenedor
                        display: 'grid',
                        justifyItems: 'center',  // Centra los botones horizontalmente
                        gridTemplateRows: 'repeat(2, 1fr)',  // Dos filas de botones
                    }}
                >
                    {/* Botón Asignar Horario */}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => onSelectOption('assignSchedule')}
                        sx={{
                            height: '150px',  // Tamaño fijo en altura
                            width: '100%',  // El ancho será el mismo para todos
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#4caf50',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <ScheduleIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        AGREGAR CLASE
                    </Button>
                    {/* Botón Escanear Código QR */}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onSelectOption('scanQr')}
                        sx={{
                            height: '150px',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#f50057',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <QrCodeScannerIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        Escanear Código QR
                    </Button>
                    {/* Botón Reportes */}
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => onSelectOption('reports')}
                        sx={{
                            height: '150px',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#00bcd4',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <AssessmentIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        Reportes
                    </Button>
                    {/* Botón Agregar Aula */}
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => onSelectOption('aula')}
                        sx={{
                            height: '150px',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#ff9800',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <ClassroomIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        Agregar Aula
                    </Button>
                    {/* Botón Agregar Sección */}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onSelectOption('seccion')}
                        sx={{
                            height: '150px',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#f44336',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        Agregar Sección
                    </Button>
                    {/* Botón Agregar Docente */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectOption('docente')}
                        sx={{
                            height: '150px',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <PersonAddIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        Agregar Docente
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectOption('newqr')}
                        sx={{
                            height: '150px',
                            width: '100%',
                            fontSize: '1.1rem',
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <PersonAddIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                        QRcode
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Menu;
