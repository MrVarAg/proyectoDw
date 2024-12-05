// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PeriodoForm = () => {
  const [nomPeriodo, setNomPeriodo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [activo, setActivo] = useState(1);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!nomPeriodo) {
      newErrors.nomPeriodo = 'El nombre del periodo es requerido.';
    }
    if (!fechaInicio) {
      newErrors.fechaInicio = 'La fecha de inicio es requerida.';
    }
    if (!fechaFin) {
      newErrors.fechaFin = 'La fecha de fin es requerida.';
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
      const response = await fetch('http://localhost:3001/periodos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomPeriodo,
          fechaInicio,
          fechaFin,
          activo,
        }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success(`Periodo "${nomPeriodo}" agregado exitosamente!`);
        setNomPeriodo('');
        setFechaInicio('');
        setFechaFin('');
        setActivo(1);
        setErrors({});
      } else {
        toast.error('Error al agregar el periodo.');
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
          Insertar Periodo
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos del Periodo
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre del Periodo"
                  variant="outlined"
                  fullWidth
                  value={nomPeriodo}
                  onChange={(e) => setNomPeriodo(e.target.value)}
                  error={!!errors.nomPeriodo}
                  helperText={errors.nomPeriodo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Inicio"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  error={!!errors.fechaInicio}
                  helperText={errors.fechaInicio}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fecha de Fin"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  error={!!errors.fechaFin}
                  helperText={errors.fechaFin}
                />
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
              Insertar Periodo
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default PeriodoForm;