// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AulaForm = () => {
  const [nomAula, setNomAula] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!nomAula) {
      newErrors.nomAula = 'El nombre del aula es requerido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Por favor, complete todos los campos requeridos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/agregar-aula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomAula }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success(`Aula "${nomAula}" agregada exitosamente!`);
        setNomAula('');
        setErrors({});
      } else {
        toast.error('Error al agregar el aula.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor.');
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
          Insertar Aula
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Nombre del Aula"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 30 }}
            margin="normal"
            value={nomAula}
            onChange={(e) => setNomAula(e.target.value)}
            error={!!errors.nomAula}
            helperText={errors.nomAula}
            sx={{
              marginBottom: 2,
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '30px',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              Insertar Aula
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AulaForm;