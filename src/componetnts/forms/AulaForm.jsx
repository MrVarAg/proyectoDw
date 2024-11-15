import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
        <Container maxWidth="sm">
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 4,
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom color="primary">
                    Agregar Aula
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Nombre del Aula"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nomAula}
                        onChange={(e) => setNomAula(e.target.value)}
                        sx={{
                            marginBottom: 2,
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            padding: '10px 0',
                            fontSize: '16px',
                            borderRadius: '30px',
                            boxShadow: 2,
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        Insertar Aula
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AulaForm;
