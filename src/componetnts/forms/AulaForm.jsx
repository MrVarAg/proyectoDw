// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AulaForm = () => {
    const [nomAula, setNomAula] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/aulas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomAula }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Aula insertada con éxito');
                setNomAula('');
            } else {
                alert(`Error al insertar aula: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al intentar insertar el aula');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Agregar Aula</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre del Aula"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nomAula}
                    onChange={(e) => setNomAula(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Insertar Aula
                </Button>
            </form>
        </Container>
    );
};

export default AulaForm;
