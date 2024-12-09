// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClaseConCarreraForm = () => {
  const [idClase, setIdClase] = useState('');
  const [nomClase, setNomClase] = useState('');
  const [idCarrera, setIdCarrera] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/carreras-a');
        const data = await response.json();
        setCarreras(data);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
        toast.error('Error al obtener las carreras.');
      }
    };

    fetchCarreras();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!idClase) {
      newErrors.idClase = 'El ID de la clase es requerido.';
    }
    if (!nomClase) {
      newErrors.nomClase = 'El nombre de la clase es requerido.';
    }
    if (!idCarrera) {
      newErrors.idCarrera = 'La carrera es requerida.';
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
      const response = await fetch('http://localhost:3001/api/insert-clase-carrera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idClase, nomClase, idCarrera }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success(`Clase "${nomClase}" agregada exitosamente!`);
        setIdClase('');
        setNomClase('');
        setIdCarrera('');
        setErrors({});
      } else {
        toast.error('Error al agregar la clase.');
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
          Insertar Clase
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="ID de la Clase"
            variant="outlined"
            inputProps={{ maxLength: 9 }}
            fullWidth
            margin="normal"
            value={idClase}
            onChange={(e) => setIdClase(e.target.value)}
            error={!!errors.idClase}
            helperText={errors.idClase}
            sx={{
              marginBottom: 2,
            }}
          />
          <TextField
            label="Nombre de la Clase"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nomClase}
            onChange={(e) => setNomClase(e.target.value)}
            error={!!errors.nomClase}
            helperText={errors.nomClase}
            sx={{
              marginBottom: 2,
            }}
          />
          <TextField
            select
            label="Carrera"
            variant="outlined"
            fullWidth
            margin="normal"
            value={idCarrera}
            onChange={(e) => setIdCarrera(e.target.value)}
            error={!!errors.idCarrera}
            helperText={errors.idCarrera}
            sx={{
              marginBottom: 2,
            }}
          >
            {carreras.map((carrera) => (
              <MenuItem key={carrera.idCarrera} value={carrera.idCarrera}>
                {carrera.nomCarrera}
              </MenuItem>
            ))}
          </TextField>
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
              Insertar Clase
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default ClaseConCarreraForm;