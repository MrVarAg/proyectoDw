import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
                    Agregar Sección
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Nombre de la Sección"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={nomSeccion}
                        onChange={(e) => setNomSeccion(e.target.value)}
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
                        Insertar Sección
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SeccionForm;
