// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import appFirebase from '../log-credenciales';
import { getAuth } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';



const auth = getAuth(appFirebase);

const HorarioForm = () => {
    const [nombre, setNombre] = useState('');
    const [horaentrada, setHoraEntrada] = useState(null);
    const [horasalida, setHoraSalida] = useState(null);
    const [diainicio, setDiaInicio] = useState('');
    const [diafin, setDiaFin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/horarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, horaentrada, horasalida, diainicio, diafin }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Horario insertado con éxito');
                // Reiniciar los campos del formulario
                setNombre('');
                setHoraEntrada(null);
                setHoraSalida(null);
                setDiaInicio('');
                setDiaFin('');
            } else {
                alert(`Error al insertar horario: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar insertar el horario');
        }
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Usuario cerrado sesión exitosamente");
            alert("Sesión cerrada con éxito");
        }).catch((error) => {
            console.error("Error al cerrar sesión: ", error);
            alert("Hubo un error al intentar cerrar sesión");
        });
    };

    return (
        <Container>
            
            <h1>Mi aplicación</h1>
           
            <Typography variant="h4" gutterBottom>
                Insertar Horario
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Hora de Entrada"
                        value={horaentrada}
                        onChange={(newValue) => setHoraEntrada(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Hora de Salida"
                        value={horasalida}
                        onChange={(newValue) => setHoraSalida(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>
                <TextField
                    label="Día de Inicio"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={diainicio}
                    onChange={(e) => setDiaInicio(e.target.value)}
                />
                <TextField
                    label="Día de Fin"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={diafin}
                    onChange={(e) => setDiaFin(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                    Insertar Horario
                </Button>
            </form>
            <Button onClick={handleLogout} variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }}>
                Logout
            </Button>
        </Container>
    );
};

export default HorarioForm;
