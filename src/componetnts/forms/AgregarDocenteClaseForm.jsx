// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  MenuItem,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AsignarDocenteForm = () => {
  const [clases, setClases] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [selectedClase, setSelectedClase] = useState('');
  const [selectedDocente, setSelectedDocente] = useState('');
  const [errors, setErrors] = useState({});

  const fetchClases = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/get-clase-creada1');
      const data = await response.json();
      setClases(data);
    } catch (error) {
      console.error('Error al cargar las clases:', error);
      toast.error('Error al cargar las clases.');
    }
  };

  useEffect(() => {
    fetchClases();
  }, []);

  useEffect(() => {
    if (selectedClase) {
      const fetchDocentes = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/get-docentes1?idClaseAsignada=${selectedClase.idClaseAsignada}&idPeriodo=${selectedClase.idPeriodo}`);
          const data = await response.json();
          setDocentes(data);
        } catch (error) {
          console.error('Error al cargar los docentes:', error);
          toast.error('Error al cargar los docentes.');
        }
      };

      fetchDocentes();
    }
  }, [selectedClase]);

  const validate = () => {
    const newErrors = {};

    if (!selectedClase) {
      newErrors.selectedClase = 'La clase es requerida.';
    }
    if (!selectedDocente) {
      newErrors.selectedDocente = 'El docente es requerido.';
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
      const response = await fetch('http://localhost:3001/api/update-num-cuenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario: selectedClase.idClaseAsignada,
          numCuenta: selectedDocente,
        }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success('Docente asignado exitosamente!');
        setSelectedClase('');
        setSelectedDocente('');
        setErrors({});
        fetchClases(); // Recargar las clases disponibles
      } else {
        toast.error('Error al asignar el docente.');
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
          Asignar Docente a Clase
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de la Asignación
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Clase"
                  variant="outlined"
                  fullWidth
                  value={selectedClase}
                  onChange={(e) => setSelectedClase(e.target.value)}
                  error={!!errors.selectedClase}
                  helperText={errors.selectedClase}
                >
                  {clases.map((clase) => (
                    <MenuItem key={clase.idClaseAsignada} value={clase}>
                      {clase.nomClase} - {clase.nomPeriodo}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Docente"
                  variant="outlined"
                  fullWidth
                  value={selectedDocente}
                  onChange={(e) => setSelectedDocente(e.target.value)}
                  error={!!errors.selectedDocente}
                  helperText={errors.selectedDocente}
                  disabled={!selectedClase}
                >
                  {docentes.map((docente) => (
                    <MenuItem key={docente.numCuenta} value={docente.numCuenta}>
                      {docente.nombre}
                    </MenuItem>
                  ))}
                </TextField>
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
              Asignar Docente
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AsignarDocenteForm;