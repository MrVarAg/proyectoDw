import React, { useState } from 'react';
import { Button, Container, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import appFirebase from '../log-credenciales';
import { getAuth } from 'firebase/auth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ClassroomIcon from '@mui/icons-material/Class';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClassIcon from '@mui/icons-material/Class';

const auth = getAuth(appFirebase);

const Menu = ({ onSelectOption }) => {
    const [activeSection, setActiveSection] = useState('');

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert('Sesión cerrada con éxito');
            })
            .catch((error) => {
                alert('Hubo un error al intentar cerrar sesión');
                console.error(error);
            });
    };

    return (
        <div>
            <Container maxWidth="lg" sx={{ marginTop: 10 }}>
                <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2} sx={{ marginBottom: 4 }}>
                    <Button variant="contained" color="primary" onClick={() => setActiveSection('persona')}>Persona</Button>
                    <Button variant="contained" color="primary" onClick={() => setActiveSection('clase')}>Clase</Button>
                    <Button variant="contained" color="primary" onClick={() => setActiveSection('institucion')}>Institución</Button>
                    <Button variant="contained" color="primary" onClick={() => setActiveSection('tareas')}>Tareas</Button>
                    <Button variant="contained" color="primary" onClick={() => onSelectOption('newqr')}>Asistencia</Button>
                    <Button variant="contained" color="primary" onClick={() => onSelectOption('reports')}>Reportes</Button>
                </Box>

                <Box display={activeSection ? 'grid' : 'none'} gridTemplateColumns="repeat(3, 1fr)" gap={4} sx={{ justifyItems: 'center' }}>
                    {activeSection === 'persona' && (
                        <>
                            <Button variant="contained" color="success" onClick={() => onSelectOption('docente')}>
                                <PersonAddIcon />
                                Agregar Docente
                            </Button>
                            <Button variant="contained" color="success" onClick={() => onSelectOption('alumno')}>
                                <PersonAddIcon />
                                Agregar Alumno
                            </Button>
                        </>
                    )}
                    {activeSection === 'clase' && (
                        <>
                            <Button variant="contained" color="success" onClick={() => onSelectOption('assignSchedule')}>
                                <ClassIcon />
                                Agregar Clase
                            </Button>
                            {/* Más botones aquí */}
                        </>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default Menu;
