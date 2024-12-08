// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Container, Box, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import appFirebase from '../log-credenciales';
import { getAuth } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icono para Asignar Horario
import ClassroomIcon from '@mui/icons-material/Class'; // Icono para Agregar Aula
import SchoolIcon from '@mui/icons-material/School'; // Icono para Agregar Carrera
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icono para Agregar Docente
import ClassIcon from '@mui/icons-material/Class';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const auth = getAuth(appFirebase);

const Menu = ({ onSelectOption }) => {
    const [activeSection, setActiveSection] = useState(''); // Controla la visibilidad de la segunda caja

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Usuario ha cerrado sesión exitosamente');
                alert('Sesión cerrada con éxito');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión: ', error);
                alert('Hubo un error al intentar cerrar sesión');
            });
    };

    return (
        <div>
            <Container maxWidth="lg" sx={{ marginTop: 10 }}>
                {/* Sección del Logo */}


                {/* Primera sección de botones */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(6, 1fr)" // Seis botones en una fila
                    gap={2}
                    sx={{ marginBottom: 4 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveSection('persona')}
                        sx={{
                            fontSize: '1rem',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: "info", boxShadow: 4 },
                        }}
                    >
                        Persona
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveSection('clase')}
                        sx={{
                            fontSize: '1rem',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: "info", boxShadow: 4 },
                        }}
                    >
                        Clase
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveSection('institucion')}
                        sx={{
                            fontSize: '1rem',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: "info", boxShadow: 4 },
                        }}
                    >
                        Institución
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveSection('tareas')}
                        sx={{
                            fontSize: '1rem',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: "info", boxShadow: 4 },
                        }}
                    >
                        Tareas
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectOption('newqr')}
                        sx={{
                            fontSize: '1rem',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: "info", boxShadow: 4 },
                        }}
                    >
                    Asistencia
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectOption('reports')}
                        sx={{
                            fontSize: '1rem',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: "info", boxShadow: 4 },
                        }}
                    >
                    Reportes
                    </Button>
                </Box>

                {/* Segunda sección de botones dinámicos */}
                <Box
                    display={activeSection ? 'grid' : 'none'} // Oculta la sección si no hay ninguna opción seleccionada
                    gridTemplateColumns="repeat(3, 1fr)" // Tres botones por fila
                    gap={4}
                    sx={{
                        justifyItems: 'center',
                    }}
                >
                    {activeSection === 'persona' && (
                        <>
                           <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('docente')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <PersonAddIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Agregar Docente
                        </Button>
                           <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('alumno')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <PersonAddIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Agregar Alumno
                        </Button>
                        </>
                    )}
                    {activeSection === 'clase' && (
                        <>
                        <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('assignSchedule')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <ClassIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                AGREGAR CLASE
                        </Button>

                        <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('seccion')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <ClassIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Agregar Sección
                        </Button>
                        <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('assignClass')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <ClassIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Aperturar Clase
                        </Button>
                        <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('assignDay')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <ScheduleIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Asignar Horario
                        </Button>
                        <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('assignTeacher')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <PersonAddIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Asignar Docente a clase
                        </Button>
                        <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('asignarClaseAlumno')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <PersonAddIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Asignar Clase a Alumno
                        </Button>
                        </>
                    )}
                    {activeSection === 'institucion' && (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('aula')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <ClassroomIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Agregar Aula
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('periodo')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <ClassroomIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Nuevo Periodo
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('carrera')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <SchoolIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Agregar Carrera
                            </Button>
                        </>
                    )}
                    {activeSection === 'tareas' && (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('asignarTarea')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <AssignmentIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                Nueva Tarea
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => onSelectOption('asignarNotaTarea')}
                                sx={{
                                    height: '120px',
                                    width: '100%',
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <AssignmentTurnedInIcon sx={{ fontSize: '2rem', marginBottom: 1 }} />
                                nota de Tarea
                            </Button>
                        </>
                    )}
                </Box>
                <Box display="flex" justifyContent="center" mb={4}>
                    <img src="../src/assets/UJCV2.png" alt="Logo de la Universidad" style={{
                         width: '300px', 
                         padding:'50px',
                         position:'absolute',
                         bottom:'0',
                         
                         }} />
                </Box>
            </Container>
        </div>
    );
};

export default Menu;
