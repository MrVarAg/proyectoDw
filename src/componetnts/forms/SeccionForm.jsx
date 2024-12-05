// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeccionForm = () => {
  const [nomSeccion, setNomSeccion] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!nomSeccion) {
      newErrors.nomSeccion = 'El nombre de la sección es requerido.';
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
      const response = await fetch('http://localhost:3001/api/agregar-seccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomSeccion }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success(`Sección "${nomSeccion}" agregada exitosamente!`);
        setNomSeccion('');
        setErrors({});
      } else {
        toast.error('Error al agregar la sección.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor.');
    }
  };

  return (
    <Container maxWidth= "sm">
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
          Insertar Sección
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Nombre de la Sección"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 30 }}
            margin="normal"
            value={nomSeccion}
            onChange={(e) => setNomSeccion(e.target.value)}
            error={!!errors.nomSeccion}
            helperText={errors.nomSeccion}
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
              Insertar Sección
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default SeccionForm;