// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
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

const AgregarClaseForm = () => {
  const [clases, setClases] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [selectedClase, setSelectedClase] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedSeccion, setSelectedSeccion] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/clases')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setClases(data);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((error) => console.error('Error al cargar las clases:', error));

    fetch('http://localhost:3001/api/periodos')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPeriodos(data);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((error) => console.error('Error al cargar los periodos:', error));
  }, []);

  useEffect(() => {
    if (selectedClase && selectedPeriodo) {
      fetch(`http://localhost:3001/api/secciones?idClase=${selectedClase}&idPeriodo=${selectedPeriodo}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setSecciones(data);
          } else {
            throw new Error('Invalid response format');
          }
        })
        .catch((error) => console.error('Error al cargar las secciones:', error));
    }
  }, [selectedClase, selectedPeriodo]);

  const validate = () => {
    const newErrors = {};
    if (!selectedClase) newErrors.clase = 'Debe seleccionar una clase.';
    if (!selectedPeriodo) newErrors.periodo = 'Debe seleccionar un periodo.';
    if (!selectedSeccion) newErrors.seccion = 'Debe seleccionar una seccion.';
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
      const response = await fetch('http://localhost:3001/api/asignar-clase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idPeriodo: selectedPeriodo,
          idClase: selectedClase,
          idSeccion: selectedSeccion,
        }),
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      if (response.ok) {
        toast.success('Clase asignada exitosamente!');
        setSelectedClase('');
        setSelectedPeriodo('');
        setSelectedSeccion('');
        setErrors({});
      } else {
        toast.error('Error al asignar la clase.');
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
          Aperturar Clase
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos de Apertura de Clase 
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.clase}>
                  <InputLabel>Clase</InputLabel>
                  <Select
                    value={selectedClase}
                    onChange={(e) => setSelectedClase(e.target.value)}
                  >
                    {clases.map((clase) => (
                      <MenuItem key={clase.idClase} value={clase.idClase}>
                        {`${clase.idClase} - ${clase.nomClase} - ${clase.nomCarrera}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.periodo}>
                  <InputLabel>Periodo</InputLabel>
                  <Select
                    value={selectedPeriodo}
                    onChange={(e) => setSelectedPeriodo(e.target.value)}
                  >
                    {periodos.map((periodo) => (
                      <MenuItem key={periodo.idPeriodo} value={periodo.idPeriodo}>
                        {`${periodo.nomPeriodo} (${periodo.fechaInicio} - ${periodo.fechaFin})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.seccion} disabled={!selectedClase || !selectedPeriodo}>
                  <InputLabel>Sección</InputLabel>
                  <Select
                    value={selectedSeccion}
                    onChange={(e) => setSelectedSeccion(e.target.value)}
                  >
                    {secciones.map((seccion) => (
                      <MenuItem key={seccion.idSeccion} value={seccion.idSeccion}>
                        {seccion.nomSeccion}
                      </MenuItem>
                    ))}
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
              Asignar Clase
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default AgregarClaseForm;