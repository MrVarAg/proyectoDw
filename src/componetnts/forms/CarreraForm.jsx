// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CarreraForm = () => {
  const [nomCarrera, setNomCarrera] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!nomCarrera) {
      newErrors.nomCarrera = 'El nombre de la carrera es requerido.';
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
      const response = await fetch('http://localhost:3001/carrerasI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomCarrera }),
      });

      if (response.ok) {
        toast.success(`Carrera "${nomCarrera}" agregada exitosamente!`);
        setNomCarrera('');
      } else {
        toast.error('Error al agregar la carrera.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
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
          Insertar Carrera
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de la Carrera
            </Typography>
            <Divider />
            <TextField
              label="Nombre de la Carrera"
              InputLabelProps={{length: 40}}
              variant="outlined"
              fullWidth
              value={nomCarrera}
              onChange={(e) => setNomCarrera(e.target.value)}
              error={!!errors.nomCarrera}
              helperText={errors.nomCarrera}
              sx={{ marginTop: 2 }}
            />
          </Box>
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
              Insertar Carrera
            </Button>
          </Box>
        </form>
      </Box>
        <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
};

export default CarreraForm;
