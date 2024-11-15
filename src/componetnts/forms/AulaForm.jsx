// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography} from '@mui/material';

const AulaForm = () => {
    const [nomAula, setNomAula] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 40) {
            setNomAula(value);
            setError(false);  // Reset error if input is valid
        } else {
            setError(true);   // Set error if input exceeds 40 characters
        }
    };

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
                    onChange={handleChange}
                    error={error}
                    helperText={error ? "Máximo 40 caracteres" : ""}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!nomAula || error}
                >
                    Insertar Aula
                </Button>
            </form>
        </Container>
    );
};

export default AulaForm;
