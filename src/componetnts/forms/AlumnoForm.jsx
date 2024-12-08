// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlumnoForm = () => {
  const [numCuenta, setNumCuenta] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [idCarrera, setIdCarrera] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [activo, setActivo] = useState('A');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/carreras-a')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener carreras');
        return response.json();
      })
      .then((data) => setCarreras(data))
      .catch((error) => console.error('Error al cargar las carreras:', error));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(numCuenta)) {
      newErrors.numCuenta = 'El número de cuenta debe tener 10 dígitos numéricos.';
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(nombre)) {
      newErrors.nombre = 'El nombre debe tener máximo 30 caracteres y no puede incluir números.';
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(apellido)) {
      newErrors.apellido = 'El apellido debe tener máximo 30 caracteres y no puede incluir números.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      newErrors.correo = 'El correo debe tener un formato válido.';
    }
    if (!idCarrera) {
      newErrors.idCarrera = 'Debe seleccionar una carrera.';
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
      const response = await fetch('http://localhost:3001/api/agregar-alumno-a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numCuenta,
          nombre,
          apellido,
          correo,
          activo,
          idCarrera,
        }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success(`Alumno "${nombre} ${apellido}" con número de cuenta "${numCuenta}" agregado exitosamente!`);
        setNumCuenta('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setIdCarrera('');
        setActivo('A');
        setErrors({});
      } else {
        toast.error('Error al agregar el alumno.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor.');
    }
  };

  return (
    <Container sx={{ maxWidth: 'md', marginTop: 5 }}>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Insertar Alumno
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de Cuenta
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{ maxLength: 10 }}
                  label="Número de Cuenta"
                  variant="outlined"
                  fullWidth
                  value={numCuenta}
                  onChange={(e) => setNumCuenta(e.target.value)}
                  error={!!errors.numCuenta}
                  helperText={errors.numCuenta}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  inputProps={{ maxLength: 30 }}
                  variant="outlined"
                  fullWidth
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  variant="outlined"
                  inputProps={{ maxLength: 30 }}
                  fullWidth
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 75 }}
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={!!errors.correo}
                  helperText={errors.correo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.idCarrera}>
                  <InputLabel>Carrera</InputLabel>
                  <Select
                    value={idCarrera}
                    onChange={(e) => setIdCarrera(e.target.value)}
                  >
                    {carreras.length > 0 ? (
                      carreras.map((carrera) => (
                        <MenuItem key={carrera.idCarrera} value={carrera.idCarrera}>
                          {carrera.nomCarrera}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">Cargando...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
              Insertar Alumno
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AlumnoForm;