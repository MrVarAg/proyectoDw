import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const SeccionForm = () => {
    const [nomSeccion, setNomSeccion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/secciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomSeccion }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Sección insertada con éxito');
                setNomSeccion('');
            } else {
                alert(`Error al insertar sección: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar insertar la sección');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Agregar Sección</Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Nombre de Aula"
                variant="outlined"
                fullWidth
                margin="dense"  // Reduce el espaciado vertical entre los campos
            />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Insertar Sección
                </Button>
            </form>
        </Container>
    );
};

export default SeccionForm;
