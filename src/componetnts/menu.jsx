import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import appFirebase from '../log-credenciales';
import { getAuth } from 'firebase/auth';

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
        <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Menú Principal
            </Typography>

            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '10px 0' }}
                    onClick={() => onSelectOption('assignSchedule')}
                >
                    Asignar Horario
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '10px 0' }}
                    onClick={() => onSelectOption('scanQr')}
                >
                    Escanear Código QR
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '10px 0' }}
                    onClick={() => onSelectOption('reports')}
                >
                    Reportes
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '10px 0' }}
                    onClick={() => onSelectOption('aula')}
                >
                    Agregar Aula
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ margin: '10px 0' }}
                    onClick={() => onSelectOption('seccion')}
                >
                    Agregar Sección
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    style={{ margin: '10px 0' }}
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </Button>
            </Box>
        </Container>
    );
};

export default Menu;
